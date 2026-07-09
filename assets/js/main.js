/* ATELIER HANNA — interactions + bilingue FR/EN (vanilla, sans dépendance) */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     I18N — dictionnaire FR → EN
     Les mots-signatures de la marque restent en français dans la
     version anglaise (Atelier, Maison, Savoir-Faire, Private Label,
     Journal) — signal de luxe, cf. blueprint §2.3.
     ============================================================ */
  var DICT = {
    /* ---- Navigation & chrome partagé ---- */
    "Processus": "Process",
    "Créations": "Creations",
    "Débuter un projet": "Start a Project",
    "Nous fabriquons.": "We craft.",
    "Vous signez.": "You sign.",
    "Nous fabriquons. Vous signez.": "We craft. You sign.",
    "Haute façon joaillière": "Fine jewellery craftsmanship",
    "depuis 1961.": "since 1961.",
    "[Adresse de l'atelier]": "[Workshop address]",
    "La Maison": "The Maison",
    "Notre histoire": "Our story",
    "Le Processus": "The Process",
    "Expertise & Capacités": "Expertise & Capabilities",
    "Collaborer": "Collaborate",
    "Confidentialité": "Confidentiality",
    "Toutes les demandes sont traitées sous accord de confidentialité.": "All enquiries are handled under a confidentiality agreement.",
    "Atelier Hanna — Tous droits réservés": "Atelier Hanna — All rights reserved",
    "Mentions légales": "Legal notice",

    /* ---- Accueil ---- */
    "Haute façon joaillière · Depuis 1961": "Fine Jewellery Craftsmanship · Since 1961",
    "La main derrière": "The hand behind",
    "les grandes marques.": "the great names.",
    "Atelier de joaillerie private label. Trois générations façonnent, en toute confidentialité, les collections de maisons du monde entier.": "A private label jewellery atelier. Three generations craft, in complete confidentiality, the collections of houses the world over.",
    "Découvrir la Maison": "Discover the Maison",
    "Les plus belles créations du monde ne naissent pas dans les boutiques où on les découvre. Elles naissent dans des ateliers que personne ne connaît. Le nôtre a soixante-cinq ans.": "The world's finest creations are not born in the boutiques where they are discovered. They are born in ateliers no one knows. Ours is sixty-five years old.",
    "Lire notre histoire": "Read our story",
    "ans de métier": "years of craft",
    "créations façonnées": "pieces crafted",
    "générations d'artisans": "generations of artisans",
    "métiers sous un même toit": "crafts under one roof",
    "Pourquoi Atelier Hanna": "Why Atelier Hanna",
    "L'exigence des grandes maisons.": "The standard of the great maisons.",
    "Sertissage sous binoculaire, polissage miroir, contrôle à la loupe 10x. Chaque pièce qui quitte l'atelier est jugée selon un seul standard : celui de la haute joaillerie. Il n'y en a pas d'autre ici.": "Setting under the microscope, mirror polishing, inspection under a 10x loupe. Every piece that leaves the atelier is judged by a single standard: that of fine jewellery. There is no other here.",
    "Notre exigence": "Our standard",
    "Un seul atelier, de l'idée à l'écrin.": "One atelier, from idea to case.",
    "Direction artistique, dessin, CAD, prototypage, fabrication, sertissage, finition, contrôle : douze métiers travaillent sous le même toit. Votre projet ne quitte jamais nos mains — ni notre responsabilité.": "Artistic direction, drawing, CAD, prototyping, manufacture, setting, finishing, inspection: twelve crafts work under one roof. Your project never leaves our hands — nor our responsibility.",
    "Notre savoir-faire": "Our savoir-faire",
    "La discrétion comme principe.": "Discretion as a principle.",
    "Vous ne trouverez ici ni logos de clients, ni pièces signées. Les maisons qui nous confient leurs collections restent seules à en porter le nom. C'est notre règle depuis trois générations — et la raison pour laquelle elles reviennent.": "You will find here neither client logos nor signed pieces. The maisons that entrust us with their collections remain the only ones to bear the name. This has been our rule for three generations — and the reason they return.",
    "Private label": "Private label",
    "Nos métiers": "Our crafts",
    "Douze gestes.": "Twelve gestures.",
    "Une seule main.": "One hand.",
    "Direction artistique": "Artistic direction",
    "Développement de collections": "Collection development",
    "Design de bijoux": "Jewellery design",
    "Dessin technique": "Technical drawing",
    "Modélisation 3D CAD": "3D CAD modelling",
    "Impression 3D": "3D printing",
    "Prototypage": "Prototyping",
    "Fabrication": "Manufacture",
    "Sertissage": "Stone setting",
    "Polissage": "Polishing",
    "Contrôle qualité": "Quality control",
    "Production finale": "Final production",
    "Explorer le savoir-faire": "Explore the savoir-faire",
    "Le processus": "The process",
    "De l'idée à l'écrin.": "From idea to case.",
    "Écouter": "Listen",
    "Dessiner": "Draw",
    "Modéliser": "Model",
    "Prototyper": "Prototype",
    "Façonner": "Craft",
    "Contrôler & livrer": "Inspect & deliver",
    "Tout commence par une conversation, couverte par un accord de confidentialité. Votre univers, vos références, vos prix cibles.": "It all begins with a conversation, covered by a confidentiality agreement. Your world, your references, your target prices.",
    "Croquis, planches, gouachés. Le dessin n'est validé que lorsqu'il est exactement votre marque.": "Sketches, boards, gouachés. A drawing is approved only when it is exactly your brand.",
    "Chaque dessin devient un modèle 3D coté au centième. Vous décidez sur des faits, pas sur des promesses.": "Each drawing becomes a 3D model dimensioned to the hundredth. You decide on facts, not promises.",
    "Vous tenez le premier exemplaire en main. Nous ajustons jusqu'au juste, puis nous le figeons pour la production.": "You hold the first example in your hand. We adjust until it is right, then freeze it for production.",
    "Fonte, montage, sertissage, polissage — sous le contrôle du même chef de projet, du début à la fin.": "Casting, assembly, setting, polishing — overseen by the same project lead, from start to finish.",
    "Chaque pièce passe le contrôle final à la loupe 10x. Ce qui n'est pas parfait ne part pas.": "Every piece passes final inspection under a 10x loupe. What is not perfect does not leave.",
    "Découvrir notre méthode": "Discover our method",
    "Des collections entières développées et façonnées à votre nom, sous accord de confidentialité, du premier croquis à la pièce livrée. Votre marque, sans compromis — et sans atelier à construire.": "Entire collections developed and crafted under your name, under a confidentiality agreement, from the first sketch to the delivered piece. Your brand, without compromise — and without an atelier to build.",
    "Développer votre collection": "Develop your collection",
    "Ils nous confient leur nom": "They entrust us with their name",
    "« Nous avons cherché pendant des années un atelier capable de suivre notre niveau d'exigence. Nous avons cessé de chercher. »": "“For years we searched for an atelier able to meet our level of exigence. We have stopped searching.”",
    "Directrice de collection · Maison de joaillerie · Paris": "Collection Director · Jewellery Maison · Paris",
    "« La qualité d'une grande maison, la réactivité d'un atelier familial. Cette combinaison n'existe pratiquement nulle part. »": "“The quality of a great maison, the responsiveness of a family atelier. That combination exists almost nowhere.”",
    "Fondateur · Marque de joaillerie indépendante · New York": "Founder · Independent Jewellery Brand · New York",
    "« Ils comprennent un croquis à main levée comme un fichier 3D. C'est ce qui fait toute la différence. »": "“They understand a freehand sketch as readily as a 3D file. That is what makes all the difference.”",
    "Directeur artistique · Maison de mode · Milan": "Artistic Director · Fashion Maison · Milan",
    "Par principe de confidentialité, nos clients sont cités sans être nommés.": "By principle of confidentiality, our clients are quoted but never named.",
    "Votre prochaine collection": "Your next collection",
    "commence ici.": "begins here.",
    "Parlez-nous de votre projet. Réponse sous 48 heures, confidentialité garantie dès le premier échange.": "Tell us about your project. A reply within 48 hours, confidentiality guaranteed from the very first exchange.",

    /* ---- La Maison ---- */
    "Soixante-cinq ans.": "Sixty-five years.",
    "Trois générations.": "Three generations.",
    "Une seule exigence.": "One standard.",
    "Le manifeste": "The manifesto",
    "Il y a, derrière chaque grand bijou, une main que personne ne voit.": "Behind every great jewel there is a hand no one sees.",
    "Elle a dessiné, ajusté, repris. Elle a serti la pierre au dixième de millimètre. Elle a poli le métal jusqu'à ce qu'il retienne la lumière. Puis elle s'est effacée — pour laisser toute la place à la marque qui signe.": "It drew, adjusted, reworked. It set the stone to a tenth of a millimetre. It polished the metal until it held the light. Then it stepped aside — to leave all the room to the brand that signs.",
    "Cette main, depuis 1961, c'est la nôtre.": "That hand, since 1961, is ours.",
    "Trois générations se la transmettent. Plus de deux cent cinquante mille créations l'ont traversée. Des maisons du monde entier lui confient ce qu'elles ont de plus précieux : leur nom.": "Three generations pass it on. More than two hundred and fifty thousand creations have passed through it. Houses the world over entrust it with what they hold most precious: their name.",
    "Nous sommes Atelier Hanna.": "We are Atelier Hanna.",
    "De l'établi": "From the workbench",
    "aux maisons du monde.": "to the world's maisons.",
    "1961 — L'établi.": "1961 — The workbench.",
    "Tout commence par un établi, une peau tendue, un jeu de limes. Le fondateur façonne ses premières pièces pour les ateliers de la place.": "It all begins with a workbench, a stretched skin, a set of files. The founder crafts his first pieces for the ateliers of the trade.",
    "1985 — La deuxième main.": "1985 — The second hand.",
    "La deuxième génération entre à l'atelier. Avec elle, le sertissage et le polissage deviennent des départements à part entière.": "The second generation joins the atelier. With it, setting and polishing become departments in their own right.",
    "2004 — Le dessin devient fichier.": "2004 — Drawing becomes file.",
    "L'atelier adopte la modélisation 3D parmi les premiers de sa génération — sans jamais abandonner le gouaché.": "The atelier adopts 3D modelling among the first of its generation — without ever abandoning the gouaché.",
    "2012 — Les maisons viennent à nous.": "2012 — The maisons come to us.",
    "Les premières marques internationales confient leurs collections à l'atelier, sous confidentialité.": "The first international brands entrust their collections to the atelier, under confidentiality.",
    "Aujourd'hui — 250 000 créations plus tard.": "Today — 250,000 creations later.",
    "Trois générations travaillent côte à côte. La règle n'a pas changé : chaque pièce est jugée comme si elle portait notre nom.": "Three generations work side by side. The rule has not changed: every piece is judged as if it bore our name.",
    "Trois générations": "Three generations",
    "La première a appris le geste. La deuxième l'a perfectionné. La troisième lui a donné de nouveaux outils.": "The first learned the gesture. The second perfected it. The third gave it new tools.",
    "À l'atelier, un fichier 3D et un gouaché à l'aquarelle se répondent sur le même établi. C'est cette conversation entre les mains et les machines qui fait notre signature.": "In the atelier, a 3D file and a watercolour gouaché answer one another on the same bench. It is this conversation between hands and machines that makes our signature.",
    "Nos principes": "Our principles",
    "Quatre règles.": "Four rules.",
    "Aucune exception.": "No exceptions.",
    "L'exigence n'a pas de version économique.": "Standards have no budget version.",
    "Il n'existe qu'un niveau de qualité à l'atelier. Celui que nous accepterions de signer.": "There is only one level of quality in the atelier. The one we would agree to sign.",
    "La discrétion est un métier.": "Discretion is a craft.",
    "Nous protégeons vos designs, vos projets et votre nom comme s'ils étaient les nôtres.": "We protect your designs, your projects and your name as if they were our own.",
    "La vitesse sans la précipitation.": "Speed without haste.",
    "Répondre vite, produire juste. La réactivité est une politesse ; la précision, une obligation.": "Reply quickly, produce precisely. Responsiveness is a courtesy; precision, an obligation.",
    "Transmettre, toujours.": "Always transmit.",
    "Un savoir-faire qui ne se transmet pas disparaît. Chaque génération forme la suivante, ici, à l'établi.": "A savoir-faire that is not passed on disappears. Each generation trains the next, here, at the bench.",
    "L'atelier": "The atelier",
    "Le lieu où tout se joue.": "Where everything is decided.",
    "La porte de l'atelier est fermée.": "The atelier door is closed.",
    "Elle s'ouvre sur rendez-vous.": "It opens by appointment.",
    "Prendre rendez-vous": "Request an appointment",

    /* ---- Savoir-Faire ---- */
    "Tout ce qu'une pièce traverse": "Everything a piece passes through",
    "avant de porter votre nom.": "before it bears your name.",
    "De la première intuition au contrôle final, chaque étape est réalisée dans nos murs, par nos mains. Aucune sous-traitance, aucune dilution : une seule chaîne de responsabilité, du croquis à l'écrin.": "From the first intuition to the final inspection, every step is carried out within our walls, by our hands. No outsourcing, no dilution: a single chain of responsibility, from sketch to case.",
    "I · Créer": "I · Create",
    "II · Développer": "II · Develop",
    "III · Façonner": "III · Craft",
    "Acte I · L'idée prend forme": "Act I · The idea takes shape",
    "Créer.": "Create.",
    "Nous ne dessinons pas pour nous. Nous dessinons pour votre marque : son histoire, ses codes, sa cliente. Nos directeurs artistiques traduisent votre univers en intentions joaillières — moodboards, lignes directrices, territoires de collection.": "We do not draw for ourselves. We draw for your brand: its story, its codes, its client. Our artistic directors translate your world into jewellery intentions — moodboards, guidelines, collection territories.",
    "Une collection n'est pas une addition de bijoux : c'est une grammaire. Nous construisons des gammes cohérentes — pièces d'appel, cœur de gamme, pièces d'exception — pensées pour vos prix de vente et vos marges.": "A collection is not a sum of jewels: it is a grammar. We build coherent ranges — entry pieces, core range, exceptional pieces — designed around your retail prices and your margins.",
    "Du croquis à main levée au gouaché aquarellé, chaque dessin est déjà une pièce : proportions, tombé, ergonomie du porté, position des pierres. Le beau, vérifié par le juste.": "From the freehand sketch to the watercolour gouaché, each drawing is already a piece: proportions, drape, ergonomics of wear, placement of stones. The beautiful, verified by the exact.",
    "Là où le dessin séduit, le plan engage. Cotes, sections, tolérances, poids estimés : le dessin technique est le contrat silencieux entre l'idée et l'établi.": "Where the drawing seduces, the plan commits. Dimensions, sections, tolerances, estimated weights: the technical drawing is the silent contract between the idea and the bench.",
    "Acte II · L'idée devient objet": "Act II · The idea becomes object",
    "Développer.": "Develop.",
    "Chaque pièce est construite en trois dimensions au centième de millimètre : épaisseurs, ajustages, serti prévu dès la conception. Vous validez des rendus photoréalistes avant qu'un gramme d'or ne soit engagé.": "Each piece is built in three dimensions to the hundredth of a millimetre: thicknesses, fittings, setting planned from the design stage. You approve photorealistic renders before a single gram of gold is committed.",
    "Nos imprimantes haute résolution produisent des modèles en cire et résine calcinable d'une précision de 25 microns. La technologie la plus récente, au service du geste le plus ancien.": "Our high-resolution printers produce wax and burnout-resin models accurate to 25 microns. The most recent technology, in the service of the oldest gesture.",
    "Le prototype est le moment de vérité : porté, pesé, ajusté, critiqué. Nous itérons jusqu'à ce que la pièce soit exactement celle que vous aviez imaginée — puis nous la figeons pour la production.": "The prototype is the moment of truth: worn, weighed, adjusted, critiqued. We iterate until the piece is exactly the one you imagined — then we freeze it for production.",
    "Acte III · L'objet devient bijou": "Act III · The object becomes jewel",
    "Façonner.": "Craft.",
    "Fonte, reprise, ajustage, montage : nos joailliers assemblent chaque pièce selon les règles de la belle ouvrage. Ce qui ne se voit pas — l'intérieur d'un corps de bague, l'envers d'un motif — est fini avec le même soin que ce qui se voit.": "Casting, reworking, fitting, assembly: our jewellers build each piece by the rules of fine craftsmanship. What cannot be seen — the inside of a ring shank, the reverse of a motif — is finished with the same care as what can.",
    "Grain, griffe, clos, rail, pavé : nos sertisseurs travaillent sous binoculaire, pierre par pierre. Un serti réussi ne retient pas seulement la pierre. Il la révèle.": "Grain, claw, bezel, channel, pavé: our setters work under the microscope, stone by stone. A successful setting does not merely hold the stone. It reveals it.",
    "Le poli est la dernière conversation entre la main et le métal. Avivage, brossage, satinage, rhodiage : chaque surface reçoit la finition exacte que le dessin exige.": "The polish is the final conversation between hand and metal. Bright polishing, brushing, satin finishing, rhodium plating: each surface receives the exact finish the design demands.",
    "Chaque pièce est contrôlée à la loupe 10x : serti, poli, ajustage, poids, dimensions. Ce qui n'est pas parfait ne part pas. La règle tient en une phrase, elle n'a pas d'exception.": "Each piece is inspected under a 10x loupe: setting, polish, fit, weight, dimensions. What is not perfect does not leave. The rule fits in one sentence; it has no exception.",
    "Petites séries numérotées ou volumes de plusieurs milliers de pièces : la même main dessine le premier prototype et contrôle la dernière pièce du réassort. La constance est notre définition du luxe.": "Small numbered series or volumes of several thousand pieces: the same hand draws the first prototype and inspects the last piece of the reorder. Consistency is our definition of luxury.",
    "Douze métiers.": "Twelve crafts.",
    "Un seul interlocuteur.": "One point of contact.",
    "Un chef de projet dédié suit votre collection de bout en bout et vous répond sous 24 heures ouvrées.": "A dedicated project lead follows your collection end to end and replies within 24 business hours.",

    /* ---- Le Processus ---- */
    "De l'idée à l'écrin,": "From idea to case,",
    "en six mouvements.": "in six movements.",
    "Une collaboration réussie n'a rien d'un mystère : c'est une méthode. Voici, pas à pas, ce qui se passe entre votre premier message et la livraison de votre collection.": "A successful collaboration is no mystery: it is a method. Here, step by step, is what happens between your first message and the delivery of your collection.",
    "Mouvement 01": "Movement 01",
    "Mouvement 02": "Movement 02",
    "Mouvement 03": "Movement 03",
    "Mouvement 04": "Movement 04",
    "Mouvement 05": "Movement 05",
    "Mouvement 06": "Movement 06",
    "Tout commence par une conversation. Votre univers, vos références, vos prix cibles, vos délais : nous écoutons avant de dessiner. Ce premier échange est couvert par un accord de confidentialité, signé avant tout envoi de documents.": "It all begins with a conversation. Your world, your references, your target prices, your deadlines: we listen before we draw. This first exchange is covered by a confidentiality agreement, signed before any documents are sent.",
    "Nos designers traduisent le brief en propositions : croquis, planches, gouachés. Vous réagissez, nous reprenons. Le dessin n'est validé que lorsqu'il est exactement votre marque.": "Our designers translate the brief into proposals: sketches, boards, gouachés. You react, we revise. A drawing is approved only when it is exactly your brand.",
    "Chaque dessin validé devient un modèle 3D coté au centième. Rendus photoréalistes, poids d'or estimés, calibres de pierres : vous décidez sur des faits, pas sur des promesses.": "Each approved drawing becomes a 3D model dimensioned to the hundredth. Photorealistic renders, estimated gold weights, stone calibres: you decide on facts, not promises.",
    "L'atelier imprime, fond et monte le premier exemplaire. Vous le tenez en main, vous le portez, vous le critiquez. Nous ajustons jusqu'au juste.": "The atelier prints, casts and assembles the first example. You hold it, you wear it, you critique it. We adjust until it is right.",
    "La production commence. Fonte, montage, sertissage, polissage : chaque pièce suit la fiche technique du prototype validé, sous le contrôle du même chef de projet.": "Production begins. Casting, assembly, setting, polishing: each piece follows the technical sheet of the approved prototype, overseen by the same project lead.",
    "Chaque pièce passe le contrôle final à la loupe 10x. Poids, dimensions, serti, poli : tout est vérifié, consigné, traçable. Puis la collection part — assurée, discrète, à l'heure.": "Every piece passes final inspection under a 10x loupe. Weight, dimensions, setting, polish: everything is checked, recorded, traceable. Then the collection ships — insured, discreet, on time.",
    "Ce que vous recevez": "What you receive",
    "Un compte rendu de brief et une proposition de cadrage — sous 48 h après le premier contact.": "A brief report and a scoping proposal — within 48h of first contact.",
    "Planches de style et dessins de collection — 1 à 3 semaines selon l'ampleur.": "Style boards and collection drawings — 1 to 3 weeks depending on scope.",
    "Fichiers 3D, rendus, estimation matière — 3 à 10 jours par pièce.": "3D files, renders, material estimate — 3 to 10 days per piece.",
    "Le prototype physique et sa fiche technique définitive — 2 à 4 semaines.": "The physical prototype and its final technical sheet — 2 to 4 weeks.",
    "Un point d'avancement à chaque jalon convenu — selon volumes, engagement ferme sur date.": "A progress update at each agreed milestone — firm date commitment according to volumes.",
    "Votre collection, ses certificats de conformité et son dossier qualité.": "Your collection, its conformity certificates and its quality file.",
    "Avant la première esquisse,": "Before the first sketch,",
    "une signature : la nôtre.": "one signature: ours.",
    "Accord de confidentialité systématique. Vos designs, vos volumes et votre nom ne quittent jamais l'atelier.": "A confidentiality agreement every time. Your designs, your volumes and your name never leave the atelier.",
    "Questions fréquentes": "Frequently asked",
    "Ce que l'on nous demande": "What we are asked",
    "avant de commencer.": "before we begin.",
    "Travaillez-vous avec des marques en cours de création ?": "Do you work with brands still being created?",
    "Oui. Nombre de nos clients ont lancé leur première collection avec nous. Nous accompagnons le projet dès le business plan produit : gammes, prix cibles, quantités raisonnables de lancement.": "Yes. Many of our clients launched their first collection with us. We support the project from the product business plan onward: ranges, target prices, sensible launch quantities.",
    "Quelles sont vos quantités minimales ?": "What are your minimum quantities?",
    "Elles dépendent de la pièce et du métal. Notre force est précisément la flexibilité : petites séries numérotées comme volumes importants. Parlons de votre projet, nous vous répondrons précisément.": "They depend on the piece and the metal. Flexibility is precisely our strength: small numbered series as readily as large volumes. Let's talk about your project and we'll give you a precise answer.",
    "Puis-je venir avec mes propres designs ?": "May I come with my own designs?",
    "Bien sûr. Croquis, fichiers 3D, pièce existante à réinterpréter : nous partons de là où vous êtes.": "Of course. Sketches, 3D files, an existing piece to reinterpret: we start from wherever you are.",
    "Comment garantissez-vous la confidentialité ?": "How do you guarantee confidentiality?",
    "Accord de confidentialité signé avant tout échange de documents, aucune référence client publiée sans accord écrit, accès restreint aux dossiers dans l'atelier.": "A confidentiality agreement signed before any document exchange, no client reference published without written consent, restricted access to files within the atelier.",
    "Quels métaux et pierres travaillez-vous ?": "Which metals and stones do you work with?",
    "Or 9/14/18 carats dans toutes ses couleurs, platine, argent 925, vermeil ; diamants et pierres de couleur, naturels ou de laboratoire, selon votre cahier des charges et vos exigences d'approvisionnement responsable.": "9/14/18 carat gold in all its colours, platinum, 925 silver, vermeil; diamonds and coloured gemstones, natural or lab-grown, according to your specifications and responsible-sourcing requirements.",
    "Le premier mouvement": "The first movement",
    "ne coûte qu'un message.": "costs only a message.",

    /* ---- Private Label ---- */
    "Des collections entières, développées et façonnées à votre marque, en toute confidentialité.": "Entire collections, developed and crafted under your brand, in complete confidentiality.",
    "Le private label, tel que nous le pratiquons, n'est pas de la sous-traitance. C'est une alliance : vous apportez la marque, la vision, le marché. Nous apportons soixante-cinq ans de main, un atelier intégré et une discrétion absolue. Vos clientes ne connaîtront jamais notre nom.": "Private label, as we practise it, is not subcontracting. It is an alliance: you bring the brand, the vision, the market. We bring sixty-five years of hand, an integrated atelier and absolute discretion. Your clients will never know our name.",
    "C'est exactement le but.": "That is exactly the point.",
    "Pour qui": "For whom",
    "Deux moments d'une marque.": "Two moments in a brand's life.",
    "Un même partenaire.": "One partner throughout.",
    "Maisons & marques établies": "Established maisons & brands",
    "Vous cherchez un atelier capable d'absorber vos collections sans diluer votre exigence. Nous produisons à votre standard, documenté pièce par pièce, avec la constance que vos clientes tiennent pour acquise — et des interlocuteurs qui parlent votre langue : celle du produit.": "You are looking for an atelier able to absorb your collections without diluting your standards. We produce to your standard, documented piece by piece, with the consistency your clients take for granted — and people who speak your language: that of product.",
    "Créateurs & marques naissantes": "Designers & emerging brands",
    "Vous lancez votre marque : vous n'avez besoin ni d'un atelier, ni d'un bureau d'études, ni d'un service qualité. Vous avez besoin des trois — sous un même toit, à des quantités de lancement raisonnables, avec un partenaire qui a déjà accompagné ce moment des dizaines de fois.": "You are launching your brand: you need neither an atelier, nor a design office, nor a quality department. You need all three — under one roof, at sensible launch quantities, with a partner who has guided this moment dozens of times.",
    "Ce que vous gagnez": "What you gain",
    "Quatre raisons de ne plus chercher.": "Four reasons to stop searching.",
    "Une qualité de grande maison, sans construire d'atelier.": "Great-maison quality, without building an atelier.",
    "Accédez immédiatement à un niveau de façon qui demande des décennies à bâtir.": "Gain immediate access to a level of craftsmanship that takes decades to build.",
    "Un time-to-market maîtrisé.": "A controlled time-to-market.",
    "Douze métiers intégrés : pas d'allers-retours entre prestataires, pas de semaines perdues en transit. De l'idée validée au prototype en quelques semaines.": "Twelve integrated crafts: no back-and-forth between suppliers, no weeks lost in transit. From approved idea to prototype in a few weeks.",
    "Une flexibilité réelle.": "Genuine flexibility.",
    "Séries de 50 ou de 5 000 : le même standard, le même interlocuteur, la même traçabilité.": "Series of 50 or 5,000: the same standard, the same contact, the same traceability.",
    "Une marque protégée.": "A protected brand.",
    "Confidentialité contractuelle, exclusivité de vos modèles, aucune réutilisation de vos designs. Jamais.": "Contractual confidentiality, exclusivity of your models, no reuse of your designs. Ever.",
    "La différence": "The difference",
    "Ce que vous ne trouverez pas ici.": "What you won't find here.",
    "Pas de catalogue de modèles copiés d'une maison à l'autre.": "No catalogue of models copied from one maison to another.",
    "Pas de qualité variable selon la série.": "No quality that varies from one series to the next.",
    "Pas de vos designs proposés « légèrement modifiés » à d'autres clients.": "None of your designs offered “slightly modified” to other clients.",
    "Pas de silence de trois semaines après votre e-mail.": "No three-week silence after your email.",
    "Chez nous, ce que vous ne trouverez pas compte autant que ce que vous trouverez.": "With us, what you won't find matters as much as what you will.",
    "Nos engagements": "Our commitments",
    "Cinq clauses.": "Five clauses.",
    "Noir sur blanc.": "In black and white.",
    "Accord de confidentialité signé avant tout échange de documents.": "A confidentiality agreement signed before any document exchange.",
    "Exclusivité totale sur vos modèles — vos moules et fichiers vous appartiennent.": "Full exclusivity on your models — your moulds and files belong to you.",
    "Réponse sous 48 heures ouvrées à toute demande, à toute étape.": "A reply within 48 business hours to any request, at any stage.",
    "Contrôle qualité individuel, consigné et traçable, sur chaque pièce livrée.": "Individual quality control, recorded and traceable, on every piece delivered.",
    "Aucune communication sur notre collaboration sans votre accord écrit.": "No communication about our collaboration without your written consent.",
    "Écouter → Dessiner → Modéliser → Prototyper → Façonner → Contrôler & livrer": "Listen → Draw → Model → Prototype → Craft → Inspect & deliver",
    "Voir le processus en détail": "See the process in detail",
    "Votre marque mérite": "Your brand deserves",
    "une grande main.": "a great hand.",
    "Racontez-nous votre projet — un échange confidentiel de trente minutes suffit pour vous dire précisément comment nous pouvons vous accompagner.": "Tell us about your project — a confidential thirty-minute conversation is enough to tell you precisely how we can help.",

    /* ---- Expertise & Capacités ---- */
    "La preuve par la main.": "Proof by hand.",
    "Derrière chaque promesse de ce site, il y a un établi, un instrument, un protocole. Cette page les décrit précisément — parce que la confiance mérite des faits.": "Behind every promise on this site there is a bench, an instrument, a protocol. This page describes them precisely — because trust deserves facts.",
    "Matières": "Materials",
    "Ce que nous travaillons.": "What we work with.",
    "Métaux": "Metals",
    "Or 9, 14 et 18 carats": "9, 14 and 18 carat gold",
    "(jaune, blanc, rose),": "(yellow, white and rose),",
    "platine": "platinum",
    "argent 925": "925 silver",
    "vermeil": "vermeil",
    ". Alliages maîtrisés en fonte interne, rhodiage et traitements de surface réalisés à l'atelier.": ". Alloys mastered in our in-house casting; rhodium plating and surface treatments carried out in the atelier.",
    "Pierres": "Stones",
    "Diamants": "Diamonds",
    "(naturels et laboratoire),": "(natural and lab-grown),",
    "pierres de couleur": "coloured gemstones",
    "précieuses et fines, calibrage et appairage réalisés en interne. Approvisionnement selon votre cahier des charges : origine, certification, conformité Kimberley.": "both precious and semi-precious, calibration and matching carried out in-house. Sourcing to your specifications: origin, certification, Kimberley Process compliance.",
    "Techniques": "Techniques",
    "Les sertis. Les finitions.": "The settings. The finishes.",
    "Serti grain — la pierre tenue par quatre perles levées au burin.": "Grain setting — the stone held by four beads raised with the graver.",
    "Serti griffe — le métal s'efface, la pierre respire.": "Claw setting — the metal recedes, the stone breathes.",
    "Serti clos — un ruban de métal épouse la pierre.": "Bezel setting — a ribbon of metal hugs the stone.",
    "Serti rail — les pierres glissées entre deux lèvres d'or.": "Channel setting — stones slid between two lips of gold.",
    "Pavé — une surface entière transformée en lumière.": "Pavé — an entire surface turned into light.",
    "Serti mystérieux — sur étude, pour les pièces d'exception.": "Mystery setting — on request, for exceptional pieces.",
    "Finitions": "Finishes",
    "Poli miroir": "Mirror polish",
    "Satiné": "Satin",
    "Brossé": "Brushed",
    "Martelé": "Hammered",
    "Sablé": "Sandblasted",
    "Rhodiage blanc et noir": "White and black rhodium",
    "Les outils du geste.": "The tools of the gesture.",
    "Modélisation CAD": "CAD Modelling",
    "Matrix / Rhino, bibliothèques paramétriques internes, rendus photoréalistes pour validation à distance.": "Matrix / Rhino, in-house parametric libraries, photorealistic renders for remote approval.",
    "Résines calcinables haute résolution, précision 25 microns, itérations de prototypage en 48 h.": "High-resolution burnout resins, 25-micron accuracy, prototyping iterations in 48h.",
    "Traçabilité": "Traceability",
    "Chaque pièce porte un numéro d'ordre suivi de la fonte au contrôle final. Dossier qualité consultable pour chaque livraison.": "Each piece carries an order number tracked from casting to final inspection. A quality file is available for every delivery.",
    "Capacités": "Capabilities",
    "De la pièce unique": "From the single piece",
    "aux grands volumes.": "to large volumes.",
    "L'atelier est dimensionné pour les deux extrêmes — une pièce d'exception sertie en plusieurs semaines, ou des réassorts de plusieurs milliers d'unités tenus au même standard. Entre les deux, toutes les séries que votre croissance exigera.": "The atelier is scaled for both extremes — an exceptional piece set over several weeks, or reorders of several thousand units held to the same standard. Between the two, every series your growth will require.",
    "Nos délais sont des engagements, pas des estimations.": "Our lead times are commitments, not estimates.",
    "Le protocole qualité": "The quality protocol",
    "Quatre contrôles.": "Four inspections.",
    "Aucun raccourci.": "No shortcuts.",
    "Contrôle matière": "Material inspection",
    "À réception — alliages, calibres, certificats.": "On receipt — alloys, calibres, certificates.",
    "Contrôle en cours": "In-process inspection",
    "Vérification à chaque poste avant transmission au suivant.": "Verification at each station before handing over to the next.",
    "Contrôle final": "Final inspection",
    "Loupe 10x, pièce par pièce : serti, poli, ajustage, poids, dimensions.": "10x loupe, piece by piece: setting, polish, fit, weight, dimensions.",
    "Consignation": "Recording",
    "Chaque contrôle est enregistré ; le dossier qualité accompagne la livraison.": "Each inspection is recorded; the quality file accompanies the delivery.",
    "Responsabilité": "Responsibility",
    "Or recyclé certifié sur demande, diamants conformes au processus de Kimberley, pierres tracées selon votre cahier des charges. Le luxe qui dure ne se construit pas sur des matières dont on ignore l'histoire.": "Certified recycled gold on request, diamonds compliant with the Kimberley Process, stones traced to your specifications. Luxury that lasts is not built on materials whose story is unknown.",
    "Mettez-nous à l'épreuve.": "Put us to the test.",
    "Confiez-nous une pièce test. C'est souvent ainsi que commencent nos plus longues collaborations.": "Entrust us with a test piece. That is often how our longest collaborations begin.",
    "Commander une pièce test": "Order a test piece",

    /* ---- Créations ---- */
    "250 000 pièces.": "250,000 pieces.",
    "Aucun nom.": "No names.",
    "Chaque création de cette galerie a été façonnée pour une marque qui la signe. Par principe, nous ne citons personne — nous montrons seulement ce que la main sait faire. Les maisons qui nous choisissent comprennent immédiatement pourquoi.": "Every creation in this gallery was crafted for a brand that signs it. On principle, we name no one — we show only what the hand can do. The maisons that choose us understand why at once.",
    "Tout": "All",
    "Bagues": "Rings",
    "Colliers": "Necklaces",
    "Boucles": "Earrings",
    "Pièces d'exception": "Exceptional pieces",
    "Pavé neige · or 18 ct · 214 diamants": "Snow pavé · 18ct gold · 214 diamonds",
    "Maille forçat serrée · or rose 18 ct": "Tight curb chain · 18ct rose gold",
    "Jonc satiné · serti clos · saphir de calibre": "Satin bangle · bezel setting · calibrated sapphire",
    "Pampille articulée · platine · diamants taille poire": "Articulated drop · platinum · pear-cut diamonds",
    "Fermoir cliquet invisible · double sécurité": "Invisible ratchet clasp · double safety",
    "Serti mystérieux · 31 heures de sertissage": "Mystery setting · 31 hours of setting",
    "Ajourage à la bocfil · envers fini miroir": "Saw-pierced openwork · mirror-finished reverse",
    "Intérieur galbé confort · gravure au burin": "Comfort-curved interior · graver engraving",
    "Pavé descendu sur tranche · or blanc rhodié": "Pavé down the edge · rhodium-plated white gold",
    "Rivière · 96 diamants appairés en interne": "Rivière · 96 diamonds matched in-house",
    "Monture haute joaillerie · assemblage à la main": "High-jewellery mount · hand assembly",
    "Serti griffe quatre grains · chaîne intégrée": "Four-claw setting · integrated chain",
    "Anatomie d'une pièce · n°01": "Anatomy of a piece · no.01",
    "Le pavé impossible.": "The impossible pavé.",
    "Le brief : une surface courbe intégralement pavée, sans qu'aucun grain ne soit visible à l'œil nu. 214 diamants, 9 calibres différents, une tolérance de pose au centième.": "The brief: a curved surface entirely pavé-set, with no bead visible to the naked eye. 214 diamonds, 9 different calibres, a setting tolerance to the hundredth.",
    "Ce que cette pièce prouve : lorsqu'un dessin semble impossible à produire, il est simplement en avance sur son atelier.": "What this piece proves: when a drawing seems impossible to produce, it is simply ahead of its atelier.",
    "La prochaine pièce de cette galerie": "The next piece in this gallery",
    "peut être la vôtre.": "could be yours.",

    /* ---- Journal ---- */
    "Le Journal de l'Atelier.": "The Atelier Journal.",
    "Ce que soixante-cinq ans d'établi nous ont appris — et ce que nous continuons d'apprendre.": "What sixty-five years at the bench have taught us — and what we keep learning.",
    "Atelier · À la une": "Atelier · Featured",
    "Une journée à l'établi : 24 heures dans la vie d'une pièce.": "A day at the bench: 24 hours in the life of a piece.",
    "De la cire du matin au contrôle du soir, le récit d'une pièce qui traverse l'atelier — et des mains qui se la transmettent.": "From the morning wax to the evening inspection, the story of a piece crossing the atelier — and of the hands that pass it on.",
    "À paraître": "Coming soon",
    "Conseils aux marques": "Advice for brands",
    "Lancer sa marque de joaillerie : les 7 décisions qui précèdent le premier croquis.": "Launching your jewellery brand: the 7 decisions that precede the first sketch.",
    "Private label, marque blanche, façon : que choisir pour votre marque de bijoux ?": "Private label, white label, façon: which to choose for your jewellery brand?",
    "Combien coûte vraiment le développement d'une collection de joaillerie ?": "What does developing a jewellery collection really cost?",
    "Petites séries ou stock : la bonne stratégie de production pour une jeune marque.": "Small series or stock: the right production strategy for a young brand.",
    "Comment choisir son atelier de fabrication (et les questions à lui poser).": "How to choose your manufacturing atelier (and the questions to ask it).",
    "Le gouaché : pourquoi la haute joaillerie dessine encore à l'aquarelle.": "The gouaché: why fine jewellery still draws in watercolour.",
    "Grain, griffe, clos : petit traité des sertis.": "Grain, claw, bezel: a short treatise on settings.",
    "Du fichier 3D à la cire : ce que l'impression change (et ne change pas).": "From 3D file to wax: what printing changes (and what it does not).",
    "Or recyclé, or tracé : ce que « responsable » veut dire en joaillerie.": "Recycled gold, traced gold: what “responsible” means in jewellery.",
    "Diamant naturel, diamant de laboratoire : le point de vue de l'établi.": "Natural diamond, lab-grown diamond: the view from the bench.",
    "Trois générations, un établi : entretien croisé.": "Three generations, one bench: a cross-interview.",
    "Les Feuillets de l'Atelier": "The Atelier Pages",
    "Une lettre par mois.": "One letter a month.",
    "Le métier et rien d'autre.": "The craft and nothing else.",
    "Votre adresse e-mail": "Your email address",
    "S'inscrire": "Subscribe",

    /* ---- Contact ---- */
    "Débutons.": "Let's begin.",
    "Racontez-nous votre projet en quelques lignes. Un membre de la Maison — jamais un robot, jamais un commercial — vous répond personnellement sous 48 heures ouvrées.": "Tell us about your project in a few lines. A member of the Maison — never a bot, never a salesperson — replies to you personally within 48 business hours.",
    "Chaque échange est confidentiel. Un accord de confidentialité peut être signé avant tout envoi de documents.": "Every exchange is confidential. A confidentiality agreement can be signed before any documents are sent.",
    "Visites de l'atelier sur rendez-vous.": "Atelier visits by appointment.",
    "Votre nom": "Your name",
    "Il nous faut un nom pour vous répondre.": "We need a name to reply to you.",
    "Votre e-mail": "Your email",
    "Il nous faut une adresse pour vous répondre.": "We need an address to reply to you.",
    "Votre marque ou projet": "Your brand or project",
    "(« en création » accepté)": "(‘in creation’ welcome)",
    "Vous êtes…": "You are…",
    "Choisir…": "Choose…",
    "Maison établie": "Established maison",
    "Marque en lancement": "Launching brand",
    "Créateur indépendant": "Independent designer",
    "Maison de mode": "Fashion maison",
    "Autre": "Other",
    "Votre projet en quelques mots": "Your project in a few words",
    "Une collection de 12 pièces en or 18 ct, lancement printemps prochain…": "A 12-piece collection in 18ct gold, launching next spring…",
    "Où en êtes-vous ?": "Where are you now?",
    "Idée": "Idea",
    "Dessins existants": "Existing drawings",
    "Fichiers 3D prêts": "3D files ready",
    "Production à transférer": "Production to transfer",
    "Envoyer — réponse sous 48 h": "Send — reply within 48h",
    "Vos informations ne sont jamais partagées. Jamais.": "Your information is never shared. Ever.",
    "Message reçu": "Message received",
    "Votre message": "Your message",
    "est entre bonnes mains.": "is in good hands.",
    "Nous vous répondons personnellement sous 48 heures ouvrées. D'ici là, le Journal de l'Atelier vous est ouvert.": "We reply to you personally within 48 business hours. Until then, the Atelier Journal is open to you.",
    "Lire le Journal": "Read the Journal",

    /* ---- 404 ---- */
    "Erreur 404": "Error 404",
    "Cette pièce n'existe pas.": "This piece does not exist.",
    "Pas encore.": "Not yet.",
    "La page que vous cherchez a été déplacée ou n'a jamais été façonnée. Revenons à l'établi.": "The page you are looking for has moved or was never crafted. Let's return to the bench.",
    "Retour à l'accueil": "Back to home",

    /* ---- Pages légales (titres) ---- */
    "Modèle à compléter avec les informations réelles de la société.": "Template to complete with the company's actual details.",
    "Éditeur du site": "Site publisher",
    "Hébergement": "Hosting",
    "Propriété intellectuelle": "Intellectual property",
    "Droit applicable": "Governing law",
    "Politique de confidentialité": "Privacy policy",
    "Modèle à adapter et faire valider juridiquement (RGPD).": "Template to adapt and have legally reviewed (GDPR).",
    "Notre principe": "Our principle",
    "Données collectées": "Data collected",
    "Conservation": "Retention",
    "Vos droits": "Your rights",
    "Mesure d'audience": "Analytics"
  };

  var TITLES = {
    "Atelier Hanna — Haute Façon Joaillière · Private Label depuis 1961": "Atelier Hanna — Fine Jewellery Craftsmanship · Private Label since 1961",
    "La Maison — 65 ans, 3 générations, une seule exigence | Atelier Hanna": "The Maison — 65 years, 3 generations, one standard | Atelier Hanna",
    "Savoir-Faire — Design, CAD, prototypage, sertissage, production | Atelier Hanna": "Savoir-Faire — Design, CAD, Prototyping, Setting, Production | Atelier Hanna",
    "Le Processus — De l'idée à l'écrin, en six mouvements | Atelier Hanna": "The Process — From Idea to Case, in Six Movements | Atelier Hanna",
    "Private Label — Fabrication de joaillerie à votre marque | Atelier Hanna": "Private Label — Jewellery Manufacturing Under Your Name | Atelier Hanna",
    "Expertise & Capacités — Métaux, sertis, technologies, qualité | Atelier Hanna": "Expertise & Capabilities — Metals, Settings, Technology, Quality | Atelier Hanna",
    "Créations — 250 000 pièces. Aucun nom. | Atelier Hanna": "Creations — 250,000 Pieces. No Names. | Atelier Hanna",
    "Le Journal de l'Atelier — Savoir-faire, conseils aux marques, matières | Atelier Hanna": "The Atelier Journal — Craft, Advice for Brands, Materials | Atelier Hanna",
    "Débuter un projet — Contact confidentiel | Atelier Hanna": "Start a Project — Confidential Enquiry | Atelier Hanna",
    "Page introuvable | Atelier Hanna": "Page Not Found | Atelier Hanna",
    "Mentions légales | Atelier Hanna": "Legal Notice | Atelier Hanna",
    "Politique de confidentialité | Atelier Hanna": "Privacy Policy | Atelier Hanna"
  };

  function norm(s) { return s.replace(/\s+/g, " ").trim(); }
  function tr(fr) { var k = norm(fr); return DICT[k] !== undefined ? DICT[k] : fr; }

  var currentLang = "fr";
  var langCbs = [];
  function onLangChange(fn) { langCbs.push(fn); }
  window.__ahTr = tr;
  window.__ahLang = function () { return currentLang; };

  /* ---------- Header : état au scroll ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (!header) return;
    if (document.body.classList.contains("header-solid")) { header.classList.add("scrolled"); return; }
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector(".burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      header.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
  }

  /* ---------- Révélations au scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll("[data-reveal],.stagger,.timeline,.notfound-list li").forEach(function (el) { io.observe(el); });

  /* ---------- Compteurs ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reduced) { el.textContent = format(target); return; }
    var start = null, dur = 1200;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function format(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach(function (el) { cio.observe(el); });

  /* ---------- Manifeste : texte qui s'encre (bilingue) ---------- */
  document.querySelectorAll("[data-ink]").forEach(function (block) {
    var src = norm(block.textContent);
    var handler = null;
    function render(lang) {
      if (handler) { window.removeEventListener("scroll", handler); handler = null; }
      var text = (lang === "en") ? tr(src) : src;
      var words = text.split(/\s+/);
      block.textContent = "";
      words.forEach(function (w, i) {
        var s = document.createElement("span");
        s.className = "ink-word";
        s.textContent = w;
        block.appendChild(s);
        if (i < words.length - 1) block.appendChild(document.createTextNode(" "));
      });
      var spans = block.querySelectorAll(".ink-word");
      if (reduced) { spans.forEach(function (s) { s.classList.add("on"); }); return; }
      handler = function () {
        var r = block.getBoundingClientRect();
        var vh = window.innerHeight;
        var progress = Math.min(Math.max((vh * 0.85 - r.top) / (vh * 0.7), 0), 1);
        var count = Math.floor(progress * spans.length);
        spans.forEach(function (s, i) { s.classList.toggle("on", i < count); });
      };
      window.addEventListener("scroll", handler, { passive: true });
      handler();
    }
    render(currentLang);
    onLangChange(render);
  });

  /* ---------- Liste des métiers : media qui suit le curseur ---------- */
  var list = document.querySelector(".metier-list");
  var cm = document.querySelector(".cursor-media");
  if (list && cm && window.matchMedia("(hover:hover)").matches) {
    var ph = cm.querySelector(".ph");
    var lbl = cm.querySelector(".ph-label");
    list.addEventListener("mousemove", function (ev) {
      cm.style.transform = "translate(" + (ev.clientX + 32) + "px," + (ev.clientY - 100) + "px)";
    });
    list.addEventListener("mouseover", function (ev) {
      var li = ev.target.closest("li");
      if (!li) return;
      list.classList.add("hovering");
      cm.classList.add("on");
      ph.className = "ph " + (li.getAttribute("data-tone") || "t-etabli");
      lbl.textContent = li.getAttribute("data-label") || "";
    });
    list.addEventListener("mouseleave", function () {
      list.classList.remove("hovering");
      cm.classList.remove("on");
    });
  }

  /* ---------- Témoignages ---------- */
  document.querySelectorAll(".quotes").forEach(function (wrap) {
    var quotes = wrap.querySelectorAll(".quote");
    var dots = wrap.parentElement.querySelectorAll(".quote-dots button");
    if (!quotes.length) return;
    var i = 0, timer;
    function show(n) {
      i = n % quotes.length;
      quotes.forEach(function (q, k) { q.classList.toggle("on", k === i); });
      dots.forEach(function (d, k) { d.classList.toggle("on", k === i); });
    }
    function auto() { timer = setInterval(function () { show(i + 1); }, 6000); }
    dots.forEach(function (d, k) { d.addEventListener("click", function () { clearInterval(timer); show(k); auto(); }); });
    show(0);
    if (!reduced) auto();
  });

  /* ---------- Accordéon FAQ ---------- */
  document.querySelectorAll(".acc-item button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".acc-item");
      var body = item.querySelector(".acc-body");
      var open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      body.style.maxHeight = open ? body.scrollHeight + "px" : "0";
    });
  });

  /* ---------- Filtres galerie ---------- */
  var filters = document.querySelector(".filters");
  if (filters) {
    filters.addEventListener("click", function (ev) {
      var btn = ev.target.closest("button");
      if (!btn) return;
      filters.querySelectorAll("button").forEach(function (b) { b.classList.remove("on"); });
      btn.classList.add("on");
      var cat = btn.getAttribute("data-filter");
      document.querySelectorAll(".gallery figure").forEach(function (f) {
        f.style.display = (cat === "all" || f.getAttribute("data-cat") === cat) ? "" : "none";
      });
    });
  }

  /* ---------- Frise horizontale : drag + molette (accueil) ---------- */
  document.querySelectorAll(".hstrip").forEach(function (strip) {
    // molette verticale → défilement horizontal (sans piéger la page aux extrémités)
    strip.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // trackpad horizontal : défaut
      var atStart = strip.scrollLeft <= 0;
      var atEnd = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 1;
      if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
        e.preventDefault();
        strip.scrollLeft += e.deltaY;
      }
    }, { passive: false });
    // glisser à la souris
    var down = false, startX = 0, startL = 0, moved = false;
    strip.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") return; // le tactile défile nativement
      down = true; moved = false; startX = e.clientX; startL = strip.scrollLeft;
      strip.classList.add("dragging");
    });
    strip.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      strip.scrollLeft = startL - dx;
    });
    function endDrag() { down = false; strip.classList.remove("dragging"); }
    strip.addEventListener("pointerup", endDrag);
    strip.addEventListener("pointerleave", endDrag);
    strip.addEventListener("pointercancel", endDrag);
    // éviter que le glisser déclenche un clic sur un lien de la carte
    strip.addEventListener("click", function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);

    // indice visuel « faites glisser » injecté après la frise
    var hint = document.createElement("p");
    hint.className = "hstrip-hint";
    hint.setAttribute("data-no-i18n", "");
    hint.innerHTML = '<span class="hint-label"></span><span class="line"></span>';
    strip.insertAdjacentElement("afterend", hint);
    var hintLabel = hint.querySelector(".hint-label");
    function setHint(lang) { hintLabel.textContent = lang === "en" ? "Drag or scroll" : "Faites glisser"; }
    setHint(currentLang);
    onLangChange(setHint);
  });

  /* ---------- Formulaire de contact ---------- */
  var form = document.getElementById("contactForm");
  if (form && /[?&]ok=1\b/.test(window.location.search)) {
    form.style.display = "none";
    var okBox = document.getElementById("formConfirm");
    if (okBox) okBox.classList.add("on");
  }
  if (form) {
    form.addEventListener("submit", function (ev) {
      var email = form.querySelector("#f-email");
      var name = form.querySelector("#f-nom");
      var ok = true;
      [name, email].forEach(function (f) {
        var field = f.closest(".form-field");
        var valid = f.value.trim() !== "" && (f.id !== "f-email" || /.+@.+\..+/.test(f.value));
        field.classList.toggle("invalid", !valid);
        if (!valid) ok = false;
      });
      if (!ok) { ev.preventDefault(); return; }
      if (!form.getAttribute("action") || form.getAttribute("action") === "#") {
        ev.preventDefault();
        form.style.display = "none";
        var confirm = document.getElementById("formConfirm");
        if (confirm) confirm.classList.add("on");
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }
    });
  }

  /* ---------- Ancres actives (savoir-faire) ---------- */
  var anchorLinks = document.querySelectorAll(".anchor-nav a");
  if (anchorLinks.length) {
    var sections = Array.prototype.map.call(anchorLinks, function (a) { return document.querySelector(a.getAttribute("href")); });
    var aio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          anchorLinks.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(function (s) { if (s) aio.observe(s); });
  }

  /* ---------- Année courante ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ============================================================
     I18N — application & bascule
     ============================================================ */
  // Collecte des nœuds de texte traduisibles
  var textEntries = [];
  (function collectText() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        if (p.closest("script,style,[data-ink],[data-no-i18n],.ph-label,[data-year]")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = walker.nextNode())) {
      var fr = n.nodeValue, key = norm(fr);
      if (!key || !/[A-Za-zÀ-ÿ]/.test(key)) continue; // ignorer nombres / ponctuation
      textEntries.push({
        node: n, fr: fr, key: key,
        lead: (fr.match(/^\s*/) || [""])[0],
        trail: (fr.match(/\s*$/) || [""])[0]
      });
    }
  })();

  // Collecte des attributs traduisibles
  var attrEntries = [];
  document.querySelectorAll("[placeholder],[aria-label],[data-label]").forEach(function (el) {
    ["placeholder", "aria-label", "data-label"].forEach(function (a) {
      if (el.hasAttribute(a) && !el.closest("[data-no-i18n]")) {
        attrEntries.push({ el: el, attr: a, fr: el.getAttribute(a) });
      }
    });
  });

  var origTitle = document.title;

  function applyLang(lang) {
    textEntries.forEach(function (e) {
      e.node.nodeValue = (lang === "en" && DICT[e.key] !== undefined) ? (e.lead + DICT[e.key] + e.trail) : e.fr;
    });
    attrEntries.forEach(function (a) {
      var v = (lang === "en" && DICT[norm(a.fr)] !== undefined) ? DICT[norm(a.fr)] : a.fr;
      a.el.setAttribute(a.attr, v);
    });
    document.title = (lang === "en" && TITLES[origTitle]) ? TITLES[origTitle] : origTitle;
  }

  var toggleBtns = [];
  function setLang(lang) {
    currentLang = lang;
    try { localStorage.setItem("ah_lang", lang); } catch (e) {}
    document.documentElement.lang = lang;
    applyLang(lang);
    langCbs.forEach(function (fn) { fn(lang); });
    toggleBtns.forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  // Injection du sélecteur de langue dans le header
  (function injectToggle() {
    var nav = document.querySelector(".site-header .nav");
    if (!nav) return;
    var wrap = document.createElement("div");
    wrap.className = "lang-toggle";
    wrap.setAttribute("data-no-i18n", "");
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Language / Langue");
    wrap.innerHTML = '<button type="button" data-lang="fr" aria-pressed="true">FR</button>' +
                     '<span class="sep" aria-hidden="true">/</span>' +
                     '<button type="button" data-lang="en" aria-pressed="false">EN</button>';
    var cta = nav.querySelector(".cta-nav");
    if (cta) nav.insertBefore(wrap, cta); else nav.appendChild(wrap);
    wrap.querySelectorAll("button").forEach(function (b) {
      toggleBtns.push(b);
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
  })();

  // Langue initiale (persistée)
  var saved = "fr";
  try { saved = localStorage.getItem("ah_lang") || "fr"; } catch (e) {}
  setLang(saved === "en" ? "en" : "fr");
})();
