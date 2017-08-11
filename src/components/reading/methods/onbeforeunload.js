export function onbeforeunload(e) {
  if (window.isDev) {
    return;
  }
  if (this.redirectInitiated) {
    return;
  }
  if (this.justClicked) {
    return;
  }
  setTimeout(() => {
    this.redirectInitiated = true;
    // location.assign(fixSubdomain(`/deluxe-archetype-report-${this.archetype}-reading-3/?name=${this.props.formData.name}&email=${this.props.formData.email}`));
    const redirectUrl = fixSubdomain(`/deluxe-archetype-report-${this.archetype}-reading-3/?name=${this.props.formData.name}&email=${this.props.formData.email}`);
    const dialogText = 'CLAIM YOUR $10 DISCOUNT NOW\nGET THE DELUXE ARCHETYPE REPORT TODAY!';
    if (confirm(dialogText)) {
      location.assign(redirectUrl);
    } else {
      this.redirectInitiated = false;
    }
    location.assign(redirectUrl);
    // route(`/deluxe-archetype-report-${this.archetype}-reading-3/`);
  }, 1000);
  // const dialogText = 'CLAIM YOUR $10 DISCOUNT NOW\nGET THE DELUXE ARCHETYPE REPORT TODAY!';
  const dialogText = '********************************\n\nATTENTION!!!! \n\nDo not leave this page\n\nClaim your exclusive offer today\n\n\********************************';
  e.returnValue = dialogText;
  return dialogText;
}
