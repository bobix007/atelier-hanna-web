// Cloudflare Pages Function — traitement du formulaire de contact (optionnel).
// Endpoint : POST /api/contact
//
// Activation :
//   1. Dans le tableau de bord Cloudflare Pages > Settings > Environment variables,
//      définir RESEND_API_KEY (compte gratuit sur resend.com) et CONTACT_TO
//      (l'adresse qui reçoit les demandes, ex. contact@atelierhanna.com).
//   2. Dans /contact/index.html, remplacer action="#" par action="/api/contact".
//
// Sans configuration, le formulaire retombe sur la confirmation côté client
// gérée dans main.js — le site reste 100 % fonctionnel en statique.

export async function onRequestPost({ request, env }) {
  const form = await request.formData();

  // Honeypot anti-spam : si rempli, on fait semblant d'accepter.
  if (form.get("_gotcha")) {
    return Response.redirect(new URL("/contact/?ok=1", request.url), 303);
  }

  const nom = (form.get("nom") || "").toString().trim();
  const email = (form.get("email") || "").toString().trim();
  if (!nom || !/.+@.+\..+/.test(email)) {
    return new Response("Champs requis manquants.", { status: 400 });
  }

  const marque = (form.get("marque") || "—").toString();
  const profil = (form.get("profil") || "—").toString();
  const projet = (form.get("projet") || "—").toString();
  const etape = (form.get("etape") || "—").toString();

  // Si aucune clé n'est configurée, on redirige simplement vers la confirmation.
  if (!env.RESEND_API_KEY || !env.CONTACT_TO) {
    return Response.redirect(new URL("/contact/?ok=1", request.url), 303);
  }

  const text =
    `Nouvelle demande — Atelier Hanna\n\n` +
    `Nom : ${nom}\nE-mail : ${email}\nMarque/projet : ${marque}\n` +
    `Profil : ${profil}\nStade : ${etape}\n\nProjet :\n${projet}\n`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Site Atelier Hanna <site@atelierhanna.com>",
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `Demande de projet — ${nom}`,
      text,
    }),
  });

  return Response.redirect(new URL("/contact/?ok=1", request.url), 303);
}
