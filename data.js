/* ============================================================
   LE MONDE DES CITÉS GRECQUES — récit, questions et documents
   D'après l'enquête n° 2 de Yannick Sanchez (2019, rév. 2026).
   ============================================================ */
(function () {
  'use strict';

  const ACTS = [
    { n: 1, roman: 'I', title: 'Le voyage', subtitle: 'De Montpellier à Patras', color: '#c06a48' },
    { n: 2, roman: 'II', title: 'La chambre vide', subtitle: 'Patras, la nuit', color: '#8f4530' },
    { n: 3, roman: 'III', title: 'Delphes', subtitle: 'Le sanctuaire panhellénique', color: '#a8782d' },
    { n: 4, roman: 'IV', title: 'Athènes', subtitle: 'La cité d’Athéna', color: '#1d6b78' },
    { n: 5, roman: 'V', title: 'Le musée', subtitle: 'Le sphinx et Poséidon', color: '#3f5d5a' },
    { n: 6, roman: 'VI', title: 'Le cap Sounion', subtitle: 'La mer et les hommes', color: '#2f4a5a' }
  ];

  const SCENES = {
    bus: {
      id: 'bus', act: 1, place: 'Montpellier · 7 h 00', title: 'Le départ',
      beats: [
        { who: 'Narrateur', text: 'Vous avez participé à un concours d’histoire sur la Grèce antique… et vous remportez le premier prix : un voyage en Grèce !' },
        { who: 'Narrateur', text: 'Première étape : le trajet en bus entre Montpellier et Ravenne, en Italie. Le car quitte la ville au petit matin.' },
        { who: 'Narrateur', text: 'Sur l’écran de navigation, la route serpente le long de la Méditerranée. Il faut estimer la distance et la durée du trajet.' }
      ],
      questions: ['q1'],
      hotspots: [{ id: 'hs-route', x: 22, y: 42, label: 'La carte routière', doc: 'route' }],
      next: 'ferry'
    },
    ferry: {
      id: 'ferry', act: 1, place: 'Ravenne · 18 h 40', title: 'La traversée',
      beats: [
        { who: 'Narrateur', text: 'Après Ravenne, vous embarquez pour une magnifique croisière vers le port de Patras, en Grèce.' },
        { who: 'Narrateur', text: 'Le ferry quitte l’Italie, traverse l’Adriatique, puis longe la côte grecque. Au loin, le pont Rion-Antirion relie le Péloponnèse à la Grèce continentale.' },
        { who: 'Narrateur', text: 'Sur le pont, le vent sent le sel. Regardez la carte : quelles mers venez-vous de traverser ?' }
      ],
      questions: ['q2'],
      hotspots: [{ id: 'hs-mers', x: 18, y: 46, label: 'La carte des mers', doc: 'mers' }],
      next: 'patras'
    },
    patras: {
      id: 'patras', act: 1, place: 'Patras · 21 h 10', title: 'Théodoros',
      beats: [
        { who: 'Narrateur', text: 'Bienvenue à Patras ! La ville s’étend au bord du golfe de Corinthe, dans le Péloponnèse.' },
        { who: 'Narrateur', text: 'Vous rejoignez votre hôtel pour la nuit. Sur la terrasse, vous rencontrez Théodoros, votre guide : il connaît la Grèce comme sa poche.' },
        { who: 'Théodoros', text: 'Demain, je vous emmène là où les dieux parlaient aux hommes. Reposez-vous bien…' },
        { who: 'Narrateur', text: 'Le lendemain matin… plus personne. Théodoros a disparu. Sur la porte de sa chambre, un message vous attend.' }
      ],
      questions: ['q3'],
      hotspots: [{ id: 'hs-patras', x: 72, y: 34, label: 'Où sommes-nous ?', doc: 'patras' }],
      next: 'chambre'
    },
    chambre: {
      id: 'chambre', act: 2, place: 'Hôtel de Patras · 7 h 05', title: 'La chambre vide',
      beats: [
        { who: 'Narrateur', text: 'Le couloir de l’hôtel est silencieux. La porte de Théodoros est entrouverte.' },
        { who: 'Narrateur', text: 'Sur le lit, un bout de papier couvert de signes étranges. On dirait du grec… et il faut le traduire.' },
        { who: 'Narrateur', text: 'Un message est punaisé sur la porte : « Si vous voulez me retrouver, suivez les dieux. — T. »' }
      ],
      questions: ['q4'],
      hotspots: [
        { id: 'hs-papier', x: 46, y: 64, label: 'Le papier', doc: 'papier' },
        { id: 'hs-porte', x: 74, y: 54, label: 'Le message', doc: 'note' }
      ],
      next: 'delphes'
    },
    delphes: {
      id: 'delphes', act: 3, place: 'Delphes · 11 h 20', title: 'Le sanctuaire d’Apollon',
      beats: [
        { who: 'Narrateur', text: 'Vous voilà partis pour le sanctuaire panhellénique de Delphes, accroché aux pentes du mont Parnasse.' },
        { who: 'Narrateur', text: 'Dans l’Antiquité, des Grecs venus de toutes les cités montaient ici pour consulter Apollon. Le sanctuaire est un lieu sacré, mais aussi un lieu de rencontre.' },
        { who: 'Narrateur', text: 'Avant de continuer, il faut comprendre ce qu’est un sanctuaire… et ce que signifie « panhellénique ».' }
      ],
      questions: ['q5', 'q6'],
      hotspots: [{ id: 'hs-sanctuaire', x: 26, y: 46, label: 'Le plan du sanctuaire', doc: 'sanctuaire' }],
      next: 'stade'
    },
    stade: {
      id: 'stade', act: 3, place: 'Delphes · 12 h 10', title: 'Le stade',
      beats: [
        { who: 'Narrateur', text: 'Derrière le temple, un stade immense s’étend dans la vallée. Des gradins de pierre descendent vers la piste.' },
        { who: 'Narrateur', text: 'Tous les quatre ans, les Grecs s’y affrontent lors des jeux Pythiques, en l’honneur d’Apollon.' },
        { who: 'Narrateur', text: 'Mais pourquoi un stade dans un sanctuaire ? Et que remportaient les vainqueurs ?' }
      ],
      questions: ['q7'],
      hotspots: [
        { id: 'hs-jeux', x: 20, y: 40, label: 'Les jeux Pythiques', doc: 'jeux' },
        { id: 'hs-couronne', x: 74, y: 74, label: 'La récompense', doc: 'jeux' }
      ],
      next: 'pythie'
    },
    pythie: {
      id: 'pythie', act: 3, place: 'Delphes · 13 h 00', title: 'La Pythie',
      beats: [
        { who: 'Narrateur', text: 'Au cœur du temple d’Apollon, une salle obscure : l’adyton. C’est là que la Pythie rendait ses oracles.' },
        { who: 'Narrateur', text: 'Assise sur un trépied, elle parlait au nom du dieu. Ses paroles, souvent énigmatiques, étaient mises en forme par les prêtres.' },
        { who: 'Narrateur', text: 'Une prêtresse, un dieu, des mots à double sens : voilà comment les Grecs interrogeaient l’avenir.' }
      ],
      questions: ['q8'],
      hotspots: [{ id: 'hs-pythie', x: 50, y: 48, label: 'L’adyton', doc: 'pythie' }],
      next: 'monnaie'
    },
    monnaie: {
      id: 'monnaie', act: 3, place: 'Delphes · 14 h 30', title: 'La chouette',
      beats: [
        { who: 'Narrateur', text: 'En sortant du temple, quelque chose brille au pied de l’autel : une monnaie d’argent.' },
        { who: 'Narrateur', text: 'Sur une face, une chouette entourée d’une branche d’olivier. Trois lettres : ΑΘΕ.' },
        { who: 'Narrateur', text: 'Apollon veut visiblement vous aider… mais comment interpréter ce nouvel indice ?' }
      ],
      questions: ['q9'],
      hotspots: [{ id: 'hs-monnaie', x: 52, y: 50, label: 'Examiner la monnaie', doc: 'coin' }],
      next: 'athenes'
    },
    athenes: {
      id: 'athenes', act: 4, place: 'Athènes · 9 h 15', title: 'L’Acropole',
      beats: [
        { who: 'Narrateur', text: 'Bienvenue à Athènes ! La ville s’étend autour de l’Acropole, la « ville haute » fortifiée.' },
        { who: 'Narrateur', text: 'Vous grimpez les marches de la colline sacrée. Au sommet, le Parthénon veille sur la cité depuis plus de deux mille ans.' },
        { who: 'Narrateur', text: 'Une chouette vous observe, immobile sur une pierre : la déesse Athéna n’est pas loin.' }
      ],
      questions: ['q10'],
      hotspots: [{ id: 'hs-acropole', x: 62, y: 42, label: 'Le plan de l’Acropole', doc: 'acropole' }],
      next: 'cite'
    },
    cite: {
      id: 'cite', act: 4, place: 'Athènes · 10 h 00', title: 'La cité grecque',
      beats: [
        { who: 'Narrateur', text: 'Du haut de l’Acropole, la cité s’offre à vous : l’agora grouille de monde, les champs entourent la ville, les bateaux attendent au port.' },
        { who: 'Narrateur', text: 'Une cité grecque n’est pas seulement une ville : c’est un territoire et une communauté de citoyens.' },
        { who: 'Narrateur', text: 'Observez le plan : repérez l’acropole, l’agora, la campagne et le port.' }
      ],
      questions: ['q11'],
      hotspots: [{ id: 'hs-cite', x: 50, y: 48, label: 'Le plan de la cité', doc: 'cite' }],
      next: 'musee'
    },
    musee: {
      id: 'musee', act: 4, place: 'Athènes · 11 h 10', title: 'La veste de Théodoros',
      beats: [
        { who: 'Narrateur', text: 'Près du Parthénon, une veste oubliée sur un muret. C’est celle de Théodoros !' },
        { who: 'Narrateur', text: 'Dans la poche, un billet d’entrée. Un mot est écrit à la main : « Suivez la chouette. »' },
        { who: 'Narrateur', text: 'Le billet indique un lieu. À vous de trouver lequel.' }
      ],
      questions: ['q12'],
      hotspots: [{ id: 'hs-billet', x: 44, y: 66, label: 'Le billet', doc: 'billet' }],
      next: 'sphinx'
    },
    sphinx: {
      id: 'sphinx', act: 5, place: 'Musée de l’Acropole · 11 h 40', title: 'Le sphinx',
      beats: [
        { who: 'Narrateur', text: 'Vous poussez les portes du musée de l’Acropole. Dans la lumière tamisée, une créature étrange vous fait face.' },
        { who: 'Narrateur', text: 'Un sphinx : corps de lion, ailes d’oiseau, tête de femme. Il gardait l’entrée des sanctuaires et posait des énigmes aux voyageurs.' },
        { who: 'Narrateur', text: 'Au pied de la statue, un morceau de papier : l’énigme du Sphinx. La réponse est la clé.' }
      ],
      questions: ['q13', 'q14', 'q15'],
      hotspots: [
        { id: 'hs-sphinx', x: 66, y: 46, label: 'La statue', doc: 'sphinx' },
        { id: 'hs-enigme', x: 27, y: 68, label: 'L’énigme', doc: 'sphinx' }
      ],
      next: 'poseidon'
    },
    poseidon: {
      id: 'poseidon', act: 5, place: 'Musée de l’Acropole · 12 h 20', title: 'Le dieu au trident',
      beats: [
        { who: 'Narrateur', text: 'En traversant la galerie, un éclat de bronze attire votre regard. Une statue colossale, les bras ouverts, brandit un trident.' },
        { who: 'Narrateur', text: 'Sur la pointe du trident, le badge de guide de Théodoros ! Une nouvelle piste.' },
        { who: 'Narrateur', text: 'Quel dieu est représenté ? Et où se trouve son grand temple, tout près d’Athènes ?' }
      ],
      questions: ['q16', 'q17'],
      hotspots: [
        { id: 'hs-badge', x: 62, y: 32, label: 'Le badge', doc: 'badge' },
        { id: 'hs-statue', x: 50, y: 50, label: 'La statue', doc: 'badge' }
      ],
      next: 'sounion'
    },
    sounion: {
      id: 'sounion', act: 6, place: 'Cap Sounion · 17 h 45', title: 'La mer Égée',
      beats: [
        { who: 'Narrateur', text: 'Le bus vous dépose au cap Sounion. Le temple de Poséidon domine la mer Égée du haut de sa falaise.' },
        { who: 'Narrateur', text: 'En contrebas, un petit port de pêche s’accroche à la côte. Des barques rentrent au port, des maisons et des hôtels bordent le littoral.' },
        { who: 'Narrateur', text: 'Vous profitez du panorama quand, soudain, quelqu’un vous fait signe en contrebas…' }
      ],
      questions: ['q18', 'q19'],
      hotspots: [
        { id: 'hs-port', x: 24, y: 62, label: 'Le port de pêche', doc: 'littoral' },
        { id: 'hs-carte-sounion', x: 78, y: 34, label: 'Où sommes-nous ?', doc: 'sounion' }
      ],
      next: 'final'
    },
    final: {
      id: 'final', act: 6, place: 'Cap Sounion · 18 h 10', title: 'Théodoros',
      beats: [
        { who: 'Théodoros', text: 'Bravo ! Vous avez relevé tous les défis et suivi ma trace jusqu’au bout.' },
        { who: 'Théodoros', text: 'Je voulais vous faire découvrir la Grèce autrement : ses sanctuaires, ses cités, ses mythes et sa mer.' },
        { who: 'Narrateur', text: 'Le soleil descend sur le cap Sounion. Il est temps de rassembler vos conclusions dans le carnet.' }
      ],
      questions: [],
      hotspots: [],
      next: null
    }
  };

  const QUESTIONS = {
    q1: {
      id: 'q1', n: 1, act: 1, title: 'Le trajet en bus',
      prompt: 'Estimez approximativement le nombre de kilomètres et le temps de voyage nécessaire par la route pour relier Montpellier à Ravenne (Italie).',
      kind: 'open', doc: 'route',
      hint: 'Servez-vous de l’échelle de la carte : 1 cm ≈ 100 km. En bus, comptez environ 100 km par heure, avec des pauses.',
      vocab: { term: 'Ravenne', def: 'ville d’Italie, au sud de Venise, célèbre pour ses mosaïques.' },
      search: 'distance route Montpellier Ravenne',
      answer: 'Environ 900 km et 9 à 10 heures de route, selon l’itinéraire et les pauses.'
    },
    q2: {
      id: 'q2', n: 2, act: 1, title: 'Les mers traversées',
      prompt: 'D’après la carte, quelles mers avez-vous traversées ? Comment nomme-t-on de manière plus générale cette grande mer très célèbre, très utilisée par les peuples antiques ?',
      kind: 'open', doc: 'mers',
      hint: 'Repérez les noms écrits en bleu sur la carte. La grande mer au sud de l’Europe porte un nom qui commence par « Médi… ».',
      search: 'mers traversées Ravenne Patras',
      answer: 'La mer Adriatique, puis la mer Ionienne. Plus généralement, la mer Méditerranée.'
    },
    q3: {
      id: 'q3', n: 3, act: 1, title: 'La région de Patras',
      prompt: 'Comment s’appelle la région de Patras ?',
      kind: 'open', doc: 'patras',
      hint: 'Regardez la carte : Patras se trouve sur la grande péninsule du sud de la Grèce, reliée au continent par un pont.',
      vocab: { term: 'Péloponnèse', def: 'grande péninsule du sud de la Grèce, reliée au continent par le pont Rion-Antirion.' },
      answer: 'Patras se trouve dans le Péloponnèse, dans la région de l’Achaïe.'
    },
    q4: {
      id: 'q4', n: 4, act: 2, title: 'Le mot grec',
      prompt: 'Qu’est-il écrit sur cet indice ?',
      kind: 'open', doc: 'papier',
      hint: 'Utilisez le tableau de l’alphabet grec. Δ = D, ε = e, λ = l, φ = f, ο = o, ι = i.',
      answer: 'Δελφοί se lit « Delphes » : c’est le nom du sanctuaire d’Apollon, en Grèce centrale.'
    },
    q5: {
      id: 'q5', n: 5, act: 3, title: 'Sanctuaire et panhellénique',
      prompt: 'Donnez la définition de « sanctuaire grec » et de « panhellénique ».',
      kind: 'open', doc: 'sanctuaire',
      hint: 'Un sanctuaire est un lieu consacré à un dieu. « Pan- » signifie « tout », et « hellénique » veut dire « grec ».',
      vocab: { term: 'Panhellénique', def: 'qui rassemble tous les Grecs, de toutes les cités.' },
      answer: 'Un sanctuaire est un lieu sacré consacré à un dieu, avec un temple, un autel et parfois un oracle. Panhellénique signifie « qui rassemble tous les Grecs », de toutes les cités.'
    },
    q6: {
      id: 'q6', n: 6, act: 3, title: 'Le dieu de Delphes',
      prompt: 'À quelle divinité ce sanctuaire est-il dédié ?',
      kind: 'choice', doc: 'sanctuaire',
      options: ['Apollon', 'Poséidon', 'Zeus', 'Athéna'], correct: 0,
      good: 'Exact ! Delphes est le grand sanctuaire d’Apollon, dieu de la lumière, de la musique et de la prophétie.',
      bad: 'Non. Regardez le temple principal : c’est celui d’Apollon, le dieu qui parle par la bouche de la Pythie.',
      hint: 'Le temple principal de Delphes lui est consacré. C’est le dieu de la lumière, de la musique et de la prophétie.',
      answer: 'Apollon.'
    },
    q7: {
      id: 'q7', n: 7, act: 3, title: 'Le stade et les jeux',
      prompt: 'Pourquoi y a-t-il un stade dans le sanctuaire ? Qu’est-ce qui est organisé tous les 4 ans ? Que remportaient les vainqueurs ?',
      kind: 'open', doc: 'jeux',
      hint: 'Le stade accueille des concours sportifs. Les jeux les plus célèbres sont les jeux Olympiques ; à Delphes, ce sont les jeux… Pythiques.',
      answer: 'Le stade accueille les concours sportifs des fêtes religieuses. Tous les quatre ans, les jeux Pythiques sont organisés en l’honneur d’Apollon. Les vainqueurs recevaient une couronne de laurier.'
    },
    q8: {
      id: 'q8', n: 8, act: 3, title: 'La Pythie',
      prompt: 'Qui est la Pythie ? Quel est son rôle ?',
      kind: 'open', doc: 'pythie',
      hint: 'Elle n’est pas une déesse : elle est la prêtresse d’Apollon. Elle transmet les réponses du dieu à ceux qui viennent le consulter.',
      vocab: { term: 'Oracle', def: 'réponse d’un dieu à une question posée par un humain.' },
      answer: 'La Pythie est la prêtresse d’Apollon à Delphes. Elle rend les oracles du dieu : elle transmet ses réponses aux questions des Grecs.'
    },
    q9: {
      id: 'q9', n: 9, act: 3, title: 'La chouette d’argent',
      prompt: 'Dans quelle ville devez-vous vous rendre maintenant ? La chouette est l’attribut de quelle divinité grecque ?',
      kind: 'duo', doc: 'coin',
      parts: [
        { label: 'La ville', options: ['Athènes', 'Delphes', 'Sparte'], correct: 0 },
        { label: 'La déesse', options: ['Athéna', 'Artémis', 'Héra'], correct: 0 }
      ],
      hint: 'La chouette et la branche d’olivier sont les symboles de la cité d’Athènes. Leur déesse protectrice porte un casque et une lance.',
      answer: 'À Athènes. La chouette est l’attribut d’Athéna, la déesse protectrice de la cité.'
    },
    q10: {
      id: 'q10', n: 10, act: 4, title: 'L’Acropole',
      prompt: 'Présentez en quelques mots l’Acropole d’Athènes. Quelle est sa fonction ?',
      kind: 'open', doc: 'acropole',
      hint: 'Acropole signifie « ville haute ». C’est une colline fortifiée, au centre de la cité. Le Parthénon y est dédié à Athéna.',
      vocab: { term: 'Acropole', def: 'colline fortifiée au centre d’une cité grecque, souvent consacrée à la divinité protectrice.' },
      answer: 'L’Acropole est la colline fortifiée au centre d’Athènes. C’est le centre religieux de la cité : on y trouve le Parthénon, dédié à Athéna, et d’autres sanctuaires.'
    },
    q11: {
      id: 'q11', n: 11, act: 4, title: 'De quoi est faite une cité ?',
      prompt: 'Expliquez de quoi une cité grecque est composée.',
      kind: 'open', doc: 'cite',
      hint: 'Pensez au plan : la ville haute, la ville basse avec l’agora, la campagne autour, le port. Et surtout : les habitants, les citoyens.',
      vocab: { term: 'Cité', def: 'un territoire (ville et campagne) et une communauté de citoyens qui partagent les mêmes lois et les mêmes dieux.' },
      answer: 'Une cité grecque est composée d’une ville (asty) avec son acropole, son agora et ses temples, d’un territoire rural (chôra) et d’une communauté de citoyens. Elle peut aussi avoir un port.'
    },
    q12: {
      id: 'q12', n: 12, act: 4, title: 'Le billet',
      prompt: 'Où devez-vous vous rendre maintenant ? Marquez la réponse sur votre copie et cliquez sur le bon endroit du billet.',
      kind: 'ticket', doc: 'billet',
      hint: 'Cherchez le mot grec ΜΟΥΣΕΙΟ sur le billet. Il signifie « musée ».',
      answer: 'Au musée de l’Acropole.'
    },
    q13: {
      id: 'q13', n: 13, act: 5, title: 'Décrire le sphinx',
      prompt: 'Décrivez le sphinx.',
      kind: 'open', doc: 'sphinx',
      hint: 'Regardez la statue : un corps de lion, des ailes, une tête de femme. C’est une créature mythologique, mi-animale, mi-humaine.',
      vocab: { term: 'Sphinx', def: 'créature mythologique à corps de lion, ailes d’oiseau et tête de femme, qui pose une énigme aux voyageurs.' },
      answer: 'Le sphinx a un corps de lion, des ailes d’oiseau et une tête de femme. C’est une créature mythologique gardienne, qui pose une énigme aux voyageurs.'
    },
    q14: {
      id: 'q14', n: 14, act: 5, title: 'L’énigme',
      prompt: 'Quelle est la réponse de l’énigme ?',
      sub: '« Quel est l’animal qui marche à quatre pattes le matin, à deux pattes le midi et à trois pattes le soir ? »',
      kind: 'open', doc: 'sphinx',
      hint: 'Matin, midi, soir : ce sont les âges de la vie. Bébé, adulte, vieillard.',
      answer: 'L’homme : bébé, il marche à quatre pattes ; adulte, sur deux jambes ; vieux, il s’aide d’une canne.'
    },
    q15: {
      id: 'q15', n: 15, act: 5, title: 'Le drame d’Œdipe',
      prompt: 'Qui Œdipe a-t-il tué avant de vaincre le Sphinx ? Qui épouse-t-il après ? Pourquoi est-ce un drame ?',
      kind: 'open', doc: 'sphinx',
      hint: 'Œdipe ne connaît pas ses parents. Il tue un homme dans une querelle, puis épouse la reine de Thèbes… sans savoir qui ils sont.',
      answer: 'Œdipe tue son père Laïos, puis épouse sa mère Jocaste. C’est un drame parce qu’il accomplit sans le savoir la prophétie : parricide et inceste.'
    },
    q16: {
      id: 'q16', n: 16, act: 5, title: 'Le dieu au trident',
      prompt: 'Quelle est la divinité représentée ?',
      kind: 'choice', doc: 'badge',
      options: ['Artémis', 'Apollon', 'Héraclès', 'Poséidon'], correct: 3,
      good: 'Bravo ! Le trident et la mer désignent Poséidon, le dieu des océans et des séismes.',
      bad: 'Non. Regardez l’attribut : un trident. C’est l’arme du dieu de la mer.',
      hint: 'Le trident est l’arme du dieu de la mer. Son nom commence par « Poséi… ».',
      answer: 'Poséidon.'
    },
    q17: {
      id: 'q17', n: 17, act: 5, title: 'Le temple de Poséidon',
      prompt: 'À proximité d’Athènes, où se trouve le principal temple de Poséidon ?',
      kind: 'open', doc: 'sounion',
      hint: 'Regardez la carte de l’Attique : le temple est posé sur un cap, au bout d’une péninsule, face à la mer Égée.',
      answer: 'Au cap Sounion, à la pointe sud de l’Attique (à environ 70 km d’Athènes par la route).'
    },
    q18: {
      id: 'q18', n: 18, act: 6, title: 'L’activité du port',
      prompt: 'Quelle activité économique est représentée sur l’image ?',
      kind: 'choice', doc: 'littoral',
      options: ['La pêche', 'L’agriculture', 'L’industrie'], correct: 0,
      good: 'Oui : des barques, des filets et un petit port de pêche.',
      bad: 'Regardez les barques et les filets : c’est une activité liée à la mer.',
      hint: 'Les barques rentrent au port avec leurs filets. C’est une activité très ancienne sur les côtes grecques.',
      answer: 'La pêche.'
    },
    q19: {
      id: 'q19', n: 19, act: 6, title: 'La littoralisation',
      prompt: 'Cherchez la définition de littoralisation et écrivez-la sur la copie.',
      kind: 'open', doc: 'littoral',
      hint: 'Le littoral est la zone où la terre rencontre la mer. La littoralisation, c’est le mouvement de concentration des populations et des activités sur les côtes.',
      vocab: { term: 'Littoralisation', def: 'concentration croissante des populations et des activités sur les littoraux.' },
      search: 'définition littoralisation géographie',
      answer: 'La littoralisation est la concentration croissante des populations et des activités sur les littoraux.'
    }
  };

  const DOCS = {
    route: {
      title: 'La route Montpellier – Ravenne', kicker: 'Indice · carte routière', art: 'route',
      caption: 'Carte schématique. L’échelle permet d’estimer la distance à vol d’oiseau ; la route est un peu plus longue.',
      body: '<p>Le bus longe la Méditerranée : Montpellier, Nîmes, Marseille, Nice, puis l’Italie par Gênes et Bologne jusqu’à Ravenne.</p><p><b>À vous de jouer :</b> mesurez la distance sur la carte avec l’échelle, puis estimez la durée du trajet en bus.</p>',
      zoom: { scale: 1.8, x: '42%', y: '58%' },
      zoomText: 'L’échelle : 260 pixels représentent 200 km. À vol d’oiseau, Montpellier et Ravenne sont à environ 600 km ; par la route, comptez bien davantage.'
    },
    mers: {
      title: 'Les mers du voyage', kicker: 'Indice · carte des mers', art: 'mers',
      caption: 'Carte schématique de la Méditerranée occidentale et centrale.',
      body: '<p>De Ravenne à Patras, le ferry traverse la <b>mer Adriatique</b>, puis la <b>mer Ionienne</b>. Plus au sud s’étend la <b>mer Méditerranée</b>, la grande mer qui relie l’Europe, l’Afrique et l’Asie.</p><p>Les Grecs l’appelaient simplement « la mer » : elle était au centre de leur monde.</p>',
      zoom: { scale: 1.7, x: '55%', y: '48%' },
      zoomText: 'Adriatique au nord, Ionienne à l’ouest de la Grèce, Égée à l’est : trois mers, une seule grande Méditerranée.'
    },
    patras: {
      title: 'Patras et le Péloponnèse', kicker: 'Indice · carte de la Grèce', art: 'patras',
      caption: 'Carte schématique. Patras est au nord-ouest du Péloponnèse.',
      body: '<p>Patras se trouve dans le <b>Péloponnèse</b>, la grande péninsule du sud de la Grèce. Le <b>pont Rion-Antirion</b> la relie à la Grèce continentale.</p><p>De Patras, on peut rejoindre Delphes, puis Athènes, par la route.</p>',
      zoom: { scale: 1.8, x: '38%', y: '45%' },
      zoomText: 'Patras, dans la région de l’Achaïe, au nord-ouest du Péloponnèse.'
    },
    note: {
      title: 'Le message de Théodoros', kicker: 'Indice · hôtel de Patras', art: 'note',
      caption: 'Message retrouvé sur la porte de la chambre 12.',
      body: '<p>« Si vous voulez me retrouver, suivez les dieux. La Grèce vous attend. — T. »</p><p>Théodoros ne donne pas la destination : il donne une méthode. Le papier trouvé dans la chambre devrait en dire plus.</p>'
    },
    papier: {
      title: 'Le papier grec', kicker: 'Indice · chambre de Théodoros', art: 'papier',
      caption: 'Un mot en majuscules grecques, et un tableau de l’alphabet pour le déchiffrer.',
      body: '<p>Le mot est écrit en <b>grec majuscule</b> : ΔΕΛΦΟΙ. En utilisant l’alphabet, on obtient <b>Delphes</b>.</p><p>Delphes est un sanctuaire consacré à Apollon, au pied du mont Parnasse. C’est la première étape de la piste.</p>',
      zoom: { scale: 1.9, x: '50%', y: '26%' },
      zoomText: 'Δ (delta) · Ε (epsilon) · Λ (lambda) · Φ (phi) · Ο (omicron) · Ι (iota) → D · E · L · PH · O · I.'
    },
    sanctuaire: {
      title: 'Le sanctuaire de Delphes', kicker: 'Document · plan', art: 'sanctuaire',
      caption: 'Plan simplifié du sanctuaire : temple d’Apollon, autel, trésors des cités, théâtre et stade.',
      body: '<p>Un <b>sanctuaire</b> est un lieu sacré consacré à un dieu. On y trouve un temple, un autel pour les sacrifices, des offrandes et parfois un oracle.</p><p>Delphes est un sanctuaire <b>panhellénique</b> : il appartient à tous les Grecs, pas à une seule cité. Les cités y déposent des trésors et viennent y consulter Apollon.</p>',
      zoom: { scale: 1.7, x: '50%', y: '55%' },
      zoomText: 'Le temple d’Apollon occupe le centre du sanctuaire ; la Voie sacrée monte jusqu’à lui, bordée de trésors offerts par les cités.'
    },
    jeux: {
      title: 'Les jeux Pythiques', kicker: 'Document · les concours', art: 'jeux',
      caption: 'Les jeux Pythiques, d’après l’article « Jeux Pythiques » du Larousse.',
      body: '<p>Tous les quatre ans, à Delphes, les Grecs se rassemblent pour les <b>jeux Pythiques</b>, en l’honneur d’Apollon. On y organise des courses à pied, des concours gymniques, des courses de chars et des concours de musique et de poésie.</p><p>Le vainqueur reçoit une <b>couronne de laurier</b>, cueillie dans la vallée de Tempé. Le laurier est l’arbre d’Apollon.</p><p>Le stade du sanctuaire accueille les épreuves sportives : les jeux font partie de la religion.</p>',
      zoom: { scale: 1.6, x: '50%', y: '70%' },
      zoomText: 'La couronne de laurier : la récompense des vainqueurs, et le symbole d’Apollon.'
    },
    pythie: {
      title: 'La Pythie et l’oracle', kicker: 'Document · le temple', art: 'pythie',
      caption: 'La Pythie rendait ses oracles dans l’adyton, la salle la plus secrète du temple.',
      body: '<p>La <b>Pythie</b> est la prêtresse d’Apollon à Delphes. Assise sur un trépied de bronze, dans l’<b>adyton</b>, elle parle au nom du dieu.</p><p>Les visiteurs viennent l’interroger sur l’avenir, la guerre, les fondations de cités… Ses réponses, souvent ambiguës, sont mises en forme par les prêtres. Un oracle est la réponse d’un dieu à une question posée.</p>',
      zoom: { scale: 1.8, x: '50%', y: '52%' },
      zoomText: 'Le trépied, le laurier, la fumée : les instruments de la Pythie, intermédiaire entre les hommes et Apollon.'
    },
    coin: {
      title: 'La monnaie d’Athènes', kicker: 'Indice · monnaie d’argent', art: 'coin',
      caption: 'Tétradrachme d’argent d’Athènes, vers 470 av. J.-C. : chouette, branche d’olivier et inscription ΑΘΕ.',
      body: '<p>La <b>chouette</b> est l’attribut d’<b>Athéna</b>, la déesse protectrice d’Athènes. La branche d’olivier rappelle le cadeau d’Athéna à la cité.</p><p>Les lettres <b>ΑΘΕ</b> signifient « des Athéniens ». La monnaie indique donc la destination : Athènes.</p>',
      zoom: { scale: 1.9, x: '33%', y: '50%' },
      zoomText: 'La chouette, les yeux grands ouverts : le symbole de la sagesse d’Athéna et de la cité d’Athènes.'
    },
    acropole: {
      title: 'L’Acropole d’Athènes', kicker: 'Document · plan', art: 'acropole',
      caption: 'Plan simplifié de l’Acropole : Propylées, Parthénon, Érechtheion, statue d’Athéna, théâtre et musée.',
      body: '<p>L’<b>Acropole</b> est la « ville haute » : une colline fortifiée au centre d’Athènes. Elle est consacrée à Athéna, la déesse protectrice de la cité.</p><p>On y monte par les <b>Propylées</b>, une entrée monumentale. Au sommet, le <b>Parthénon</b> est le temple d’Athéna. L’Acropole est donc le <b>centre religieux</b> de la cité : on y célèbre les fêtes et on y dépose les offrandes.</p>',
      zoom: { scale: 1.8, x: '55%', y: '48%' },
      zoomText: 'Le Parthénon, temple d’Athéna, domine l’Acropole. Ses colonnes et son fronton sont les symboles de la cité.'
    },
    cite: {
      title: 'Une cité grecque', kicker: 'Document · plan d’une cité', art: 'cite',
      caption: 'Plan simplifié : acropole, agora, ville basse, campagne (chôra) et port.',
      body: '<p>Une cité grecque est un <b>territoire</b> : une ville (asty) avec son acropole, son agora et ses temples, une campagne (chôra) avec ses champs et ses oliviers, souvent un port.</p><p>C’est aussi une <b>communauté</b> : les citoyens partagent les mêmes lois, les mêmes dieux et participent à la vie politique. Les femmes, les étrangers et les esclaves vivent dans la cité mais ne sont pas citoyens.</p>',
      zoom: { scale: 1.7, x: '42%', y: '52%' },
      zoomText: 'L’acropole domine la ville ; l’agora est la place du marché et de la vie politique ; la chôra nourrit la cité ; le port l’ouvre sur la mer.'
    },
    billet: {
      title: 'Le billet de Théodoros', kicker: 'Indice · musée de l’Acropole', art: 'billet',
      caption: 'Billet d’entrée du musée de l’Acropole, avec un mot de Théodoros.',
      body: '<p>Le billet porte le nom du <b>musée de l’Acropole</b> : ΜΟΥΣΕΙΟ ΑΚΡΟΠΟΛΗΣ. C’est là que Théodoros vous attend… ou plutôt, c’est là qu’il a laissé un nouvel indice.</p><p>Le mot « Suivez la chouette » renvoie à Athéna, dont la chouette est le symbole.</p>',
      zoom: { scale: 1.9, x: '40%', y: '35%' },
      zoomText: 'ΜΟΥΣΕΙΟ ΑΚΡΟΠΟΛΗΣ : « musée de l’Acropole ». Le lieu est écrit en grec sur le billet.'
    },
    sphinx: {
      title: 'Le sphinx et son énigme', kicker: 'Document · statue', art: 'sphinx',
      caption: 'Sphinx du musée de l’Acropole : corps de lion, ailes d’oiseau, tête de femme.',
      body: '<p>Dans la mythologie grecque, le <b>sphinx</b> est une créature hybride : corps de lion, ailes d’oiseau, tête de femme. Il garde les sanctuaires et pose une énigme aux voyageurs.</p><p>L’énigme : « Quel est l’animal qui marche à quatre pattes le matin, à deux pattes le midi et à trois pattes le soir ? » Réponse : <b>l’homme</b>.</p><p>Œdipe résout l’énigme ; le sphinx se jette dans le vide. Mais la tragédie continue : Œdipe a tué son père Laïos sans le savoir, puis a épousé sa mère Jocaste.</p>',
      zoom: { scale: 1.8, x: '55%', y: '45%' },
      zoomText: 'Le sphinx : un corps de lion, des ailes, un visage de femme. Une créature au service des dieux, qui interroge les hommes.'
    },
    sounion: {
      title: 'Le cap Sounion', kicker: 'Indice · carte de l’Attique', art: 'sounion',
      caption: 'Carte schématique de l’Attique. Le cap Sounion est à la pointe sud.',
      body: '<p>Le <b>cap Sounion</b> est une pointe rocheuse au sud d’Athènes, face à la mer Égée. Son temple de <b>Poséidon</b> domine la mer.</p><p>Poséidon est le dieu de la mer, des tempêtes et des séismes. Les marins le priaient avant de partir.</p>',
      zoom: { scale: 1.8, x: '72%', y: '78%' },
      zoomText: 'Athènes, puis le cap Sounion : le temple de Poséidon veille sur les routes maritimes de l’Égée.'
    },
    littoral: {
      title: 'La littoralisation', kicker: 'Document · le littoral grec', art: 'littoral',
      caption: 'Le littoral concentre les ports, les pêcheurs, les habitations et les activités touristiques.',
      body: '<p>Le <b>littoral</b> est la zone où la terre rencontre la mer. La <b>littoralisation</b> est la concentration croissante des populations et des activités sur les littoraux : ports, pêche, tourisme, habitat, industries.</p><p>En Grèce, le littoral est très habité : la mer est une ressource, une voie de communication et une source de revenus.</p>',
      zoom: { scale: 1.7, x: '50%', y: '55%' },
      zoomText: 'Port de pêche, hôtels, maisons, route : sur cette côte, les hommes et les activités se pressent au bord de l’eau.'
    },
    badge: {
      title: 'Le badge de Théodoros', kicker: 'Indice · musée', art: 'badge',
      caption: 'Badge de guide retrouvé sur le trident de Poséidon.',
      body: '<p>Le badge porte le nom de Théodoros et le mot <b>GUIDE</b>. Théodoros est passé par là : il a laissé une nouvelle piste.</p><p>Le trident appartient à <b>Poséidon</b>, le dieu de la mer. Son grand temple se trouve au cap Sounion, au sud d’Athènes.</p>'
    }
  };

  const CONCLUSIONS = [
    { title: 'La cité grecque', text: 'Un territoire (ville et campagne) et une communauté de citoyens qui partagent lois et dieux.' },
    { title: 'Le sanctuaire', text: 'Un lieu sacré consacré à un dieu. Panhellénique, il rassemble tous les Grecs, de toutes les cités.' },
    { title: 'Les jeux', text: 'Sport et religion : tous les quatre ans, les jeux Pythiques honorent Apollon. Le vainqueur reçoit une couronne de laurier.' },
    { title: 'Les mythes', text: 'Le sphinx, Œdipe, les dieux : les mythes racontent le monde et donnent des leçons aux hommes.' },
    { title: 'La Méditerranée', text: 'Une mer au centre du monde grec, qui relie les cités, les îles et les ports.' },
    { title: 'La littoralisation', text: 'Les populations et les activités se concentrent sur les côtes : ports, pêche, tourisme, habitat.' }
  ];

  const RULES = [
    { icon: 'i-question', title: 'En binôme', text: 'Travaillez à deux. Une feuille et un crayon suffisent pour noter les indices et rédiger les réponses.' },
    { icon: 'i-book', title: 'Des phrases construites', text: 'Répondez par des phrases complètes, en reprenant les mots de la question. Relisez-vous à la fin.' },
    { icon: 'i-search', title: 'Les pastilles dorées', text: 'Touchez les pastilles pour ouvrir un document. Utilisez la loupe pour examiner un détail de plus près.' },
    { icon: 'i-wifi', title: 'Le bouton Wifi', text: 'Certaines questions proposent une recherche internet. Elle peut aider, mais les documents suffisent souvent.' }
  ];

  const MAP_STOPS = [
    { n: 1, place: 'Montpellier', detail: 'Le départ, en bus', x: 18, y: 72 },
    { n: 2, place: 'Ravenne', detail: 'La traversée en ferry', x: 38, y: 48 },
    { n: 3, place: 'Patras', detail: 'Théodoros disparaît', x: 52, y: 58 },
    { n: 4, place: 'Delphes', detail: 'Le sanctuaire d’Apollon', x: 63, y: 44 },
    { n: 5, place: 'Athènes', detail: 'L’Acropole et le musée', x: 76, y: 52 },
    { n: 6, place: 'Cap Sounion', detail: 'Le temple de Poséidon', x: 86, y: 66 }
  ];

  window.GREECE = { ACTS, SCENES, QUESTIONS, DOCS, CONCLUSIONS, RULES, MAP_STOPS };
})();
