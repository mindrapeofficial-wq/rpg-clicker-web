(function () {
  window.rpgTouchInit = game => {
    if (!matchMedia('(pointer: coarse)').matches) return;
    const renderer = game.getRenderer();
    const input = game.getInputManager();
    let gesture = null;
    const position = touch => renderer.convertPageToGameCoords(touch.pageX, touch.pageY);
    const currentScene = () => game.getSceneStack().getCurrentScene();
    const stop = event => { event.preventDefault(); event.stopImmediatePropagation(); };
    const slider = scene => scene.getObjects('ScrollButtonObject')[0];
    const clamp = value => Math.max(257, Math.min(332, value));

    document.addEventListener('touchstart', event => {
      if (event.touches.length !== 1 || !event.target.closest('#canvasArea')) return;
      const [x, y] = position(event.touches[0]);
      if (x < 20 || x > 210 || y < 237 || y > 340) return;
      const scene = currentScene();
      if (!scene?.getObjects('ButtonFrameObject').length) return;
      gesture = { x, y, moved: false, sliderY: slider(scene)?.getY() || 257 };
      stop(event);
    }, { capture: true, passive: false });

    document.addEventListener('touchmove', event => {
      if (!gesture) return;
      stop(event);
      const scene = currentScene();
      const [x, y] = position(event.touches[0]);
      if (Math.abs(y - gesture.y) > 6 || Math.abs(x - gesture.x) > 12) gesture.moved = true;
      if (!gesture.moved) return;
      const knob = scene && slider(scene);
      if (!knob) return;
      knob.setY(clamp(gesture.sliderY - (y - gesture.y) * 0.6));
      knob.getVariables().getFromIndex(0).setBoolean(true);
    }, { capture: true, passive: false });

    document.addEventListener('touchend', event => {
      if (!gesture) return;
      stop(event);
      const finished = gesture;
      gesture = null;
      if (finished.moved) return;
      const scene = currentScene();
      if (!scene) return;
      const frames = scene.getObjects('ButtonFrameObject').filter(frame => frame.getY() >= 237 && frame.getY() <= 336);
      if (!frames.length) return;
      const closest = frames.reduce((best, frame) =>
        Math.abs(frame.getY() + frame.getHeight() / 2 - finished.y) < Math.abs(best.getY() + best.getHeight() / 2 - finished.y) ? frame : best
      );
      if (Math.abs(closest.getY() + closest.getHeight() / 2 - finished.y) > 16) return;
      input.onMouseEnter();
      input.onMouseMove(closest.getX() + closest.getWidth() / 2, closest.getY() + closest.getHeight() / 2);
      input.onMouseButtonPressed(0);
      setTimeout(() => input.onMouseButtonReleased(0), 90);
    }, { capture: true, passive: false });
    document.addEventListener('touchcancel', () => { gesture = null; }, { capture: true });
  };
})();
