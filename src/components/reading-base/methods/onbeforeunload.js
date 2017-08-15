import fixSubdomain from '../../../utils/fix-subdomain';

export function onbeforeunload(e) {
  if (window.isDev) {
    // return;
  }
  if (this.redirectInitiated) {
    return;
  }
  if (this.justClicked) {
    return;
  }

  const redirectUrl = fixSubdomain(`/deluxe-archetype-report-${this.props.quizData.archetype}-reading-3/?name=${this.props.formData.name}&email=${this.props.formData.email}`);

  this.redirectInitiated = true;
  setTimeout(() => location.assign(redirectUrl));

  const dialogText = '********************************\n\nATTENTION!!!! \n\nDo not leave this page\n\nClaim your exclusive offer today\n\n\********************************';
  e.returnValue = dialogText;
  return dialogText;
}
