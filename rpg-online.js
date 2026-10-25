(function () {
  const googleOAuthReady = true; // Enable after Google Cloud accepts the Supabase callback URI.
  const client = window.supabase.createClient('https://mrmvmoyysxuopqexbxfk.supabase.co', 'sb_publishable_tZEPJi2v7Tp-xDuVa0qWRw_geizIGoD');
  const status = document.getElementById('auth-status');
  const button = document.getElementById('google-signin');
  const panel = document.getElementById('auth-panel');
  let user, displayName, pendingSave, saveTimer;
  const queries = new Map();
  const setStatus = message => { status.textContent = message; };
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
    hasDocument(_collection, id, result, state) { result.setBoolean(id === displayName); state.setString('ok'); },
    writeDocument(_collection, _id, variable, state) {
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
      let request = client.from('rpg_clicker_scores').select('user_id,display_name,killed_enemies,enemy_level');
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

  async function signIn() {
    button.hidden = true;
    setStatus('Conectando con Google…');
    const { error } = await client.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + window.location.pathname } });
    if (error) { cloudError(error); setStatus('No se pudo conectar con Google.'); button.hidden = false; }
  }
  button.addEventListener('click', signIn);
  window.rpgStartOnline = async startGame => {
    if (location.protocol !== 'https:' && !['127.0.0.1', 'localhost'].includes(location.hostname)) {
      panel.hidden = false; button.hidden = true;
      setStatus('Estamos activando el acceso seguro. Vuelve en unos minutos.');
      document.getElementById('arcanum-loading').remove();
      return;
    }
    setStatus('Comprobando la sesión…');
    const sessionResult = await Promise.race([client.auth.getSession(), new Promise(resolve => setTimeout(() => resolve({ data: { session: null }, error: null }), 5000))]);
    const { data: { session }, error } = sessionResult;
    if (error) cloudError(error);
    if (!session?.user) { panel.hidden = false; document.getElementById('arcanum-loading').remove(); if (googleOAuthReady) { if (!sessionStorage.getItem('rpg-google-attempted')) { sessionStorage.setItem('rpg-google-attempted', '1'); await signIn(); } else { setStatus('Acceso pendiente'); button.hidden = false; } } else setStatus('Acceso Google en preparación'); return; }
    sessionStorage.removeItem('rpg-google-attempted');
    user = session.user;
    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Jugador';
    const { data: record, error: loadError } = await client.from('rpg_clicker_players').select('game_data,display_name').eq('user_id', user.id).maybeSingle();
    displayName = record?.display_name ? String(record.display_name).trim().slice(0, 12) : String(fullName).trim().split(/[\s(]/)[0].slice(0, 12) || 'Jugador';
    if (loadError) { cloudError(loadError); setStatus('No se pudo cargar la partida. Comprueba tu conexión.'); panel.hidden = false; button.hidden = true; return; }
    writeLocalSave({ ...defaults(), ...(record?.game_data || {}), PlayerUsername: displayName });
    panel.remove();
    startGame();
  };
  document.addEventListener('visibilitychange', () => { if (document.hidden) saveNow(); });
})();










