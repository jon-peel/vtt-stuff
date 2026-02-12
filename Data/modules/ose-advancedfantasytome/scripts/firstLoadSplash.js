export default async () => {
  if (game.settings.get('ose-advancedfantasytome', 'firstLoadSplash')) {
    return;
  }

  const content = await foundry.applications.handlebars.renderTemplate('modules/ose-advancedfantasytome/templates/splash.html', {})

  const data = await foundry.applications.api.DialogV2.prompt({
    window: { title: "OSE: Advanced Fantasy" },
    content,
    ok: {
      label: "Close",
      icon: "fa-solid fa-floppy-disk",
      callback: (
        event,
        button,
        dialog
      ) => new foundry.applications.ux.FormDataExtended(button.form).object
    },
    rejectClose: false
  });
  if (data?.oseSplashCheck) {
    await game.settings.set('ose-advancedfantasytome', 'firstLoadSplash', true);
  }
}