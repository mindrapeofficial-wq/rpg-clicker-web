(function () {
  const client = window.supabase?.createClient('https://mrmvmoyysxuopqexbxfk.supabase.co', 'sb_publishable_tZEPJi2v7Tp-xDuVa0qWRw_geizIGoD');
  const button = document.getElementById('google-signin');
  const guestSaveKey = 'rpg-clicker-guest-save';
  let user, displayName, pendingSave, saveTimer;
  const queries = new Map();
  const setStatus = message => { button.textContent = message; };
  const readGuestSave = () => {
    try { return JSON.parse(localStorage.getItem(guestSaveKey) || 'null'); }
    catch { return null; }
  };
  const defaults = () => {
    const scene = gdjs.projectData.layouts.find(layout => layout.name === 'Game');
    return Object.fromEntries(scene.variables.find(variable => variable.name === 'GameData').children.map(child => [child.name, child.value]));
  };
  const writeLocalSave = data => localStorage.setItem('GDJS_SavedData', JSON.stringify({ SavedData: { str: JSON.stringify(data) } }));
  const cloudError = error => { if (error) console.error('RPG CLICKER online:', error); };

  async function saveNow() {
    if (!pendingSave || !user) return;
    const data = pendingSave;
    pendingSave = null;
    clearTimeout(saveTimer);
    saveTimer = null;
    const killed_enemies = Math.max(0, Math.floor(Number(data.KilledEnemies) || 0));
    const enemy_level = Math.max(1, Math.floor(Number(data.EnemiesLevel) || 1));
    const updated_at = new Date().toISOString();
    const [{ error: saveError }, { error: scoreError }] = await Promise.all([
      client.from('rpg_clicker_players').upsert({ user_id: user.id, display_name: displayName, killed_enemies, enemy_level, player_gold: Math.max(0, Math.floor(Number(data.PlayerGold) || 0)), game_data: data, updated_at }),
      client.from('rpg_clicker_scores').upsert({ user_id: user.id, display_name: displayName, killed_enemies, enemy_level, updated_at })
    ]);
    cloudError(saveError);
    cloudError(scoreError);
    if ((saveError || scoreError) && !pendingSave) pendingSave = data;
  }

  gdjs.evtTools.firebaseTools = gdjs.evtTools.firebaseTools || {};
  gdjs.evtTools.firebaseTools.firestore = {
    hasDocument(_collection, id, result, state) { result.setBoolean(Boolean(user) && id === displayName); state.setString('ok'); },
    writeDocument(_collection, _id, variable, state) {
      if (!user) {
        localStorage.setItem(guestSaveKey, JSON.stringify(variable.toJSObject()));
        if (state) state.setString('ok');
        return;
      }
      pendingSave = { ...variable.toJSObject(), PlayerUsername: displayName };
      if (!saveTimer) saveTimer = setTimeout(saveNow, 2000);
      if (state) state.setString('ok');
    },
    startQuery(name) { queries.set(name, {}); },
    queryLimit(name, count) { queries.get(name).limit = count; },
    queryWhere(name, field, operator, value) { queries.get(name).where = { field, operator, value }; },
    queryOrderBy(name, field, direction) { queries.get(name).order = { field, direction }; },
    async executeQuery(name, result, state) {
      const query = queries.get(name) || {};
      state.setString('pending');
      if (!client) { result.fromJSObject({ size: 0, empty: true, docs: [] }); state.setString('ok'); return; }
      let request = client.from('rpg_clicker_scores').select('display_name,killed_enemies,enemy_level');
      if (query.order) request = request.order(query.order.field === 'KilledEnemies' ? 'killed_enemies' : 'enemy_level', { ascending: query.order.direction !== 'desc' });
      if (query.limit) request = request.limit(query.limit);
      const { data, error } = await request;
      if (error) { cloudError(error); state.setString('error'); return; }
      let docs = (data || []).map(row => ({ id: row.display_name, exists: true, data: { PlayerUsername: row.display_name, KilledEnemies: row.killed_enemies, EnemiesLevel: row.enemy_level } }));
      if (query.where?.operator === '!=') docs = docs.filter(doc => String(doc.data[query.where.field]) !== String(query.where.value));
      result.fromJSObject({ size: docs.length, empty: docs.length === 0, docs });
      state.setString('ok');
    }
  };

  async function signIn(event) {
    event?.preventDefault();
    if (!client) { setStatus('Google no disponible. Reintentar'); return; }
    await saveNow();
    setStatus('Conectando con Google…');
    const { error } = await client.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + window.location.pathname } });
    if (error) { cloudError(error); setStatus('Reintentar acceso con Google'); }
  }
  button.addEventListener('click', signIn);
  window.rpgStartOnline = async startGame => {
    const sessionResult = await Promise.race([client?.auth.getSession() || Promise.resolve({ data: { session: null }, error: null }), new Promise(resolve => setTimeout(() => resolve({ data: { session: null }, error: null }), 5000))]);
    const { data: { session }, error } = sessionResult;
    if (error) cloudError(error);
    if (!session?.user) {
      const guestSave = readGuestSave();
      if (guestSave) writeLocalSave({ ...defaults(), ...guestSave });
      else localStorage.removeItem('GDJS_SavedData');
      startGame();
      return;
    }
    user = session.user;
    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Jugador';
    displayName = String(fullName).trim().split(/[\s(]/)[0].slice(0, 12) || 'Jugador';
    const { data: record, error: loadError } = await client.from('rpg_clicker_players').select('game_data,display_name').eq('user_id', user.id).maybeSingle();
    if (loadError) {
      cloudError(loadError);
      setStatus('No se pudo cargar la partida. Recargar');
      button.removeEventListener('click', signIn);
      button.addEventListener('click', event => { event.preventDefault(); location.reload(); });
      document.querySelector('#arcanum-loading .loading-mark span').textContent = 'No se pudo cargar la partida. Comprueba tu conexión.';
      return;
    }
    const data = record?.game_data || readGuestSave() || {};
    displayName = String(record?.display_name || data.PlayerUsername || displayName).trim().slice(0, 12);
    writeLocalSave({ ...defaults(), ...data, PlayerUsername: displayName });
    button.hidden = true;
    startGame();
  };
  document.addEventListener('visibilitychange', () => { if (document.hidden) saveNow(); });
})();
