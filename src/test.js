async function a(a) {
  a = await import('./assets/audios/deluxe-archetype-sales');
  this.transcript = await import(`./assets/audios/${this.archetype}`);
}

