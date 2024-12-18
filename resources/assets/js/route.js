import page from 'page';
import siapaKami from '../../views/pages/siapa-kami.pug';

const html = siapaKami({ name: 'Siapa Kami Hayo...' });

page('*', async (ctx) => {
    try {
      const response = await fetch(`${ctx.path}.html`);
      if (!response.ok) throw new Error('Page not found');

      document.body.innerHTML = await response.text();

    } catch (error) {
      console.error(error);
    }
  });
  
// Mulai router
page();