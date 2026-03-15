import { Topic, DifficultyLevel, QuizMode } from './types';

export const CARDIO_CONTENT = `
CARDIOLOGIE - F93

FIBRILLATION AURICULAIRE (FA):
Définition: Trouble du rythme cardiaque lié au vieillissement. Désorganisation totale de l'activité électrique auriculaire attribuable à de multiples foyers ectopiques dans les oreillettes. Les oreillettes tremblent jusqu'à 400 bpm, les ventricules se contractent irrégulièrement entre 80-180 bpm.

Épidémiologie: Arythmie la plus fréquente. Au Canada, >5% des 65+ ans (1 million). Jusqu'à 8% des 80+ ans. Responsable de 20% des AVC ischémiques. Augmente le risque d'AVC de 3-5 fois.

Conséquences hémodynamiques: Perte d'efficacité de la contraction auriculaire, perte de la systole atriale, perte de l'adaptation de la FC à l'effort, risque d'IC, risque thromboembolique (caillots dans les oreillettes).

Causes cardiovasculaires: HTA, insuffisance cardiaque, cardiopathie valvulaire, maladie coronarienne avec IM, dysfonction VG, post-chirurgie cardiaque, cause génétique.

Causes non-cardiaques: Apnée du sommeil, obésité, alcool excessif, hyperthyroïdie, stimulation vagale, maladie pulmonaire, idiopathique.

Facteurs de risque: Âge avancé, sexe masculin, HTA, IC à FE abaissée, valvulopathie, MPOC, hyperthyroïdie, coronaropathie, apnée du sommeil, obésité, alcool, tabagisme, diabète, néphropathie chronique.

Manifestations cliniques: Palpitations, dyspnée, fatigue, étourdissements, syncope, douleur thoracique, anxiété.

Examens paracliniques: ECG (diagnostic différentiel), analyses sanguines (électrolytes, fonction rénale, hépatique, thyroïde), ETT (échocardiographie), RX pulmonaire, score CHA₂DS₂-VASc.

Score CHA₂DS₂-VASc: C=Insuffisance cardiaque (1pt), H=Hypertension (1pt), A₂=Âge ≥75 ans (2pts), D=Diabète (1pt), S₂=AVC/AIT/TE antérieur (2pts), V=Maladie vasculaire (1pt), A=Âge 65-74 ans (1pt), Sc=Sexe féminin (1pt).

Traitements: Anticoagulants (Coumadin/Warfarine RIN cible 2-3 pour FA non valvulaire, 2.5-3.5 pour valve mécanique), antiplaquettaires si score bas, cardioversion (électrique ou pharmacologique), contrôle de la FC (bêtabloquants, inhibiteurs calciques), contrôle du rythme (antiarythmiques).

Soins infirmiers: Surveillance signes de saignement avec anticoagulants, enseignement sur aliments riches en vitamine K avec Coumadin, surveillance FC et TA, évaluation des symptômes, préparation pour cardioversion.

INSUFFISANCE CARDIAQUE (IC):
Définition: Syndrome de dysfonctionnement ventriculaire caractérisé par l'incapacité du cœur à exercer sa fonction de pompage ou de remplissage. Le cœur travaille plus fort mais est moins efficace.

Épidémiologie: 1 personne sur 5 atteinte d'IC dans sa vie. 1% des <65 ans, 7% des 75-84 ans, 15% des 85+ ans. Maladie chronique nécessitant traitement à long terme.

Physiopathologie: Le ventricule se contracte mal et se vide mal. Incapacité à pomper suffisamment de sang (dysfonction systolique) ou nécessite pressions de remplissage élevées (dysfonction diastolique).

Mécanismes compensatoires:
- Fréquence cardiaque: ↑ FC pour ↑ débit cardiaque
- Volume d'éjection: Volume de sang éjecté à chaque contraction
- Débit cardiaque: VES x FC
- Précharge: Volume dans ventricules à fin de diastole
- Postcharge: Force de résistance durant contraction
- Contractilité: Capacité de contraction indépendante des conditions de charge
- Fraction d'éjection (FE): % de sang éjecté pendant systole (normale 55-70%)

Mécanismes de compensation: Hypertrophie ventriculaire (↑ masse musculaire), dilatation ventriculaire (étirement des fibres), activation du SNS (↑ catécholamine), réaction hormonale (↑ SRAA, ↑ ADH), peptides natriurétiques (PNA, PNB favorisent vasodilatation).

Types d'IC:
1. IC gauche (dysfonction VG): Diminue volume d'éjection, refoulement dans OG et veines pulmonaires, congestion pulmonaire, œdème pulmonaire.
2. IC droite (dysfonction VD): Diminue volume d'éjection, refoulement dans OD, circulation systémique, distension veines jugulaires, hépatomégalie, œdème périphérique.
3. IC globale: Dysfonction VD + VG.

Causes cardiaques: Maladie coronaire, infarctus, valvulopathie, cardiomyopathie, malformations congénitales, arythmies (ex: FA).

Causes autres: HTA, MPOC, asthme, hypertension pulmonaire, apnée du sommeil, diabète, obésité, anorexie, carence en fer, anémie, goutte, alcool, chimiothérapie, radiothérapie, maladies inflammatoires, septicémie, dépression, anxiété.

Manifestations cliniques:
Anamnèse: Fatigue, dyspnée, orthopnée (↑ retour veineux en décubitus dorsal), dyspnée nocturne paroxystique, nycturie (6-7x/nuit).
Inspection: Peau froide/cyanose/pâleur/œdème périphérique, tachypnée, tachycardie, œdème (périphérique/pulmonaire/hépatomégalie/ascite), agitation/confusion.
Palpation: Hépatomégalie, distension abdominale, ascite, SNV.
Auscultation: Pulmonaire (ronchus/crépitants), cardiaque (B3-B4/souffle), thoracique (angine).

Examens paracliniques: FSC, électrolytes, PNB (Peptides Natriurétiques de type B), ECG, échocardiographie, RX pulmonaire, Mibi, GSA, fonction thyroïdienne (T3, T4, TSH). Si IC chronique: test de marche 6 min, épreuve d'effort. Si IC aiguë: coronarographie.

Pharmacothérapie:
- IECA (inhibiteurs de l'enzyme de conversion)
- ARA (antagonistes des récepteurs de l'angiotensine)
- Bêtabloquant
- Diurétique (ex: furosémide): excrétion rénale de Na+ + H2O → ↓ volume plasmatique
- Inotrope positif (ex: Digoxine)
- Vasodilatateurs (ex: hydralazine): ↓ RVS
- Bloqueurs des canaux calciques (ex: amlodipine)
- ARA (ex: valsartan)

Thérapie nutritionnelle: Diète hyposodée, diète DASH.

Interventions chirurgicales: Transplantation cardiaque, resynchronisation cardiaque + défibrillateur.

Soins courants IC chronique:
Détection signes précurseurs: Arythmie, gain de poids rapide (ex: +1,4 kg en 2 jours), ronchus/crépitants.
Traiter hypervolémie: Diurétique selon ordonnance, équilibre hydrique, restriction liquidienne.
Surveillance: Peser client même moment (matin), vérifier abdomen (ascite/hépatomégalie/splénomégalie), œdème périphérique, pertes électrolytiques (natrémie, kaliémie).
Évaluer: Capacités aux activités, état mental/respiratoire/cardiaque, niveau de connaissances, résultats (urée, créatinine, DFG).
Enseignement: FA.C.E.S. (Fatigue, Activité limitée, Congestion/toux, Enflure, Souffle court), prise FC (Lanoxin/bêtabloquant), effets Rx, vaccination antigrippale/antipneumococcique.

Complications: IC décompensation aiguë, anxiété, épanchement pleural, arythmie, dépression, OAP, insuffisance rénale.

SYNDROME CORONARIEN AIGU (SCA):
Artères coronaires:
- Artère coronaire gauche: Tronc commun se divise en interventriculaire antérieure gauche et circonflexe. Alimente OG, VG, septum, partie VD.
- Artère coronaire droite: Alimente OD, VD, partie paroi postérieure VG. Chez 90%, nœud AV et faisceau de His reçoivent apport de coronaire droite. Obstruction provoque arythmies.

Cellules cardiaques:
1. Cellules contractiles: Cardiomyocytes, assurent contraction
2. Cellules cardionectrices (tissu nodal): Initiation et conduction de contraction
3. Cellules myoendocrines: Synthétisent ANP (oreillettes) et BNP (ventricules) → ↑ natriurèse

Activité électrique: Au repos, fibre cardiaque polarisée (+ à l'extérieur, - à l'intérieur). Stimulation produit dépolarisation avec inversion des charges. Repolarisation ramène charges au repos.

Système nerveux parasympathique (nerf vague): Acétylcholine (récepteurs nicotiniques et muscariniques). ↓ vitesse d'émission des stimulus (chronotrope négatif), ↓ conduction du nœud AV (dromotrope négatif).

HYPERTENSION ARTÉRIELLE (HTA):
Définition: PA = RVS x DC. Classification (Hypertension Canada 2017): >130/80 mmHg population adulte, >120/80 mmHg population à risque. HTA isolée: PAS >140 + PAD <90. Confirmer: >2 résultats anormaux/5 visites.

Types d'HTA:
1. HTA primaire (essentielle): >90-95% des cas. Au début: ↑ DC + ↑ RVS. Plus tard: DC normal, mais ↑ RVS.
2. HTA secondaire: 5-10% des cas. Sténose artère rénale, troubles endocriniens (Cushing), neurologiques, cirrhose, grossesse, cocaïne, AINS/contraceptifs oraux, apnée du sommeil.

Facteurs de risque: Âge, alcool, ATCD familiaux, sexe (♂ <55 ans, ♀ >55 ans), sédentarité, stress, tabagisme, statut socioéconomique défavorisé, obésité, dyslipidémie, diabète, syndrome métabolique.

Manifestations cliniques: Asymptomatique (tueur silencieux), fatigue, ↓ tolérance à l'activité, étourdissements, palpitations, douleur thoracique, dyspnée. Si HTA grave: céphalées matinales, confusion, anxiété, troubles visuels (scotomes).

Examen clinique:
Anamnèse: État mental (confusion/agitation = signes AVC), variation PA + pouls (hypotension orthostatique).
Inspection: Obésité (tour de taille), œdème périphérique.
Palpation: Pouls périphériques diminués/absents, pouls carotidiens/rénaux/fémoraux (souffle).
Auscultation: Cardiaque (B3-B4), pulmonaire (crépitants/↓ murmures vésiculaires).
Examen ophtalmique: Rétinopathie.

Examens paracliniques: Analyse d'urine, profil biochimique (Na+, K+), FSC, BUN/créatinine/Hb glyquée/glycémie à jeun, profil lipidique (cholestérol/triglycérides/HDL/LDL/apoB), ECG, RX pulmonaire, échographie rénale, clairance créatinine, protéinurie 24h.

Pharmacothérapie:
But: ↓ volume sanguin + ↓ RVS.
- Diurétiques (ex: furosémide): excrétion rénale de Na+ + H2O → ↓ volume plasmatique
- Bêtabloquants (ex: métoprolol): ↓ effets SNS → ↓ FC → ↓ PA
- Vasodilatateurs (ex: hydralazine): ↓ RVS
- Bloqueurs des canaux calciques (ex: amlodipine): vasodilatation artérielle
- IECA: blocage transformation angiotensine I en II
- ARA (ex: valsartan): inhibition action angiotensine II → vasodilatation

Thérapie nutritionnelle: Régime DASH, réduction sodium.

Modification habitudes de vie: Perte de poids, activité physique régulière, ↓ alcool, arrêt tabagisme, gestion du stress.

Surveillance: Monitorage périodique PA, suivi régulier à domicile, suivi mensuel en clinique si stable, q.3-6 mois si PA stable, annuelle si changements habitudes de vie.

Pour clients diabétiques: PAS ≥150 mmHg, PAS >130 mmHg + PAD >80 mmHg.
`;

export const DIABETE_CONTENT = `
DIABÈTE - F93

MÉDICAMENTS ANTIHYPERGLYCÉMIANTS:

Biguanides:
- Metformine (Glucophage): 500-850 mg BID/TID (max 850 mg TID/1000 mg BID)
  Mode d'action: Diminuent quantité de sucre produite par le foie, rendent cellules plus sensibles à l'insuline.
  Moment optimal: Pendant les repas.
  Effets secondaires: Diarrhée, goût de métal, nausées.
  DFGe: <15 contre-indiqué; 15-29: 500 mg DIE (ne pas introduire); 30-44: 500 mg BID; 45-59: 500 mg BID.
- Metformine à libération prolongée (Glumetza): 500-1000 mg DIE (max 2000 mg DIE). Moment optimal: Au souper.

Sulfonylurées (Sécrétagogues):
- Gliclazide (Diamicron): 80 mg (max 160 mg BID); MR 30-60 mg (max 120 mg DIE)
- Glimépiride (Amaryl): 1-2-4 mg (max 8 mg DIE)
- Glyburide (Diabeta): 2,5-5 mg DIE/BID (max 10 mg BID)
  Mode d'action: Stimulent production d'insuline par le pancréas.
  Moment optimal: Avant le repas (<30 min); ne pas prendre au coucher. Diamicron MR SEULEMENT au déjeuner.
  Effets secondaires: Hypoglycémie, gain de poids (1,5 kg).
  ↓ HbA1c: 0,5 à 1,0%.

Méglitinides:
- Répaglinide (GlucoNorm): 0,5-1-2 mg TID (max 4 mg QID)
  Mode d'action: Stimule production d'insuline par le pancréas.
  Moment optimal: Avant le repas (<15 min); ne pas prendre au coucher.
  Effets secondaires: Hypoglycémie.
  ↓ HbA1c: 0,5 à 1,0%.

Thiazolidinediones (TZD):
- Pioglitazone (Actos): 15-30-45 mg DIE
- Rosiglitazone (Avandia): 2-4-8 mg DIE (NON DISPONIBLE au Canada)
  Mode d'action: Rendent cellules plus sensibles à l'insuline.
  Moment optimal: Avec ou sans aliments, même moment de la journée.
  Effets secondaires: Rétention d'eau, gain de poids (1,5 à 2,8 kg), insuffisance cardiaque.
  ↓ HbA1c: 0,9 à 1,5%.
  Restrictions: Pioglitazone - risque cancer de la vessie; Rosiglitazone - risque événements cardiovasculaires.

Inhibiteurs des alpha-glucosidases:
- Acarbose (Glucobay): 50-100 mg TID (max 100 mg TID)
  Mode d'action: Retarde l'absorption de certains glucides dans les intestins.
  Moment optimal: Avec la première bouchée du repas.
  Effets secondaires: Flatulences, ballonnements, selles molles.
  ↓ HbA1c: 0,5 à 1,0%.

Inhibiteurs de la DPP-4:
- Sitagliptine (Januvia): 100 mg DIE
- Linagliptine (Trajenta): 5 mg DIE
- Saxagliptine (Onglyza): 5 mg DIE
- Alogliptine (Nesina): 25 mg DIE
  Mode d'action: Augmentent effet des incrétines qui stimulent sécrétion d'insuline et diminuent production de glucagon.
  Moment optimal: Avec ou sans aliments, même moment de la journée.
  Effets secondaires: Pharyngite, maux de tête.
  ↓ HbA1c: 0,5 à 0,8%.
  Poids: Neutre.

Inhibiteurs du SGLT2:
- Canagliflozine (Invokana): 100-300 mg DIE
- Empagliflozine (Jardiance): 10-25 mg DIE
- Dapagliflozine (Forxiga): 5-10 mg DIE
  Mode d'action: Favorisent élimination du sucre dans l'urine.
  Moment optimal: Canagliflozine - avant premier repas; Empagliflozine/Dapagliflozine - n'importe quel moment.
  Effets secondaires: Infections génitales à levures, infections urinaires, besoin fréquent d'uriner.
  ↓ HbA1c: 0,7 à 0,8%.
  Poids: ↓ 2,1 à 3,1 kg.
  Bénéfices cardio-rénaux: ↓ hospitalisation IC, ↓ progression néphropathie, ↓ albuminurie.

Analogues du GLP-1 (Injectables):
- Liraglutide (Victoza s.c.): 0,6 mg DIE x 1 sem → 1,2 mg DIE x 1 sem → 1,8 mg DIE (optionnel)
- Dulaglutide (Trulicity s.c.): 0,75 mg 1 f.p.s. x 2 sem → 1,5 mg 1 f.p.s. (optionnel)
- Sémaglutide (Ozempic s.c.): 0,25 mg 1 f.p.s. x 4 sem → 0,5 mg 1 f.p.s. x 4 sem → 1 mg 1 f.p.s. (optionnel)
- Sémaglutide oral (Rybelsus): 3 mg DIE x 30 jours → 7 mg DIE x 30 jours → 14 mg DIE (optionnel)
  Mode d'action: Imitent incrétines qui stimulent sécrétion d'insuline et diminuent production de glucagon. Ralentissent digestion, diminuent appétit.
  Moment optimal: Victoza - injection 1x/jour; Trulicity/Ozempic - injection 1x/semaine; Rybelsus - à jeun, 30 min avant premier repas.
  Effets secondaires: Nausées, diarrhée, vomissements.
  ↓ HbA1c: 1,0 à 1,5%.
  Poids: ↓ 2,6 à 5,8 kg.

Analogues du GLP-1 + GIP:
- Tirzépatide (Mounjaro): 2,5 mg 1 f.p.s. x 4 sem → 5 mg, 10 mg ou 15 mg 1 f.p.s. (optionnel)
  ↓ HbA1c: 2,0 à 2,3%.
  Poids: ↓ 7,6 à 11,2 kg.

TYPES D'INSULINES:

Insulines à action rapide (analogues):
- Asparte rapide (Fiasp): Début 4 min, Pic 0,5-1,5h, Durée 3-4h. 0-2 min avant repas (peut être administrée jusqu'à 20 min après début du repas).
- Asparte (NovoRapid, Kirsty, Trurapi): Début 10-20 min, Pic 1-3h, Durée 3-5h. 0-10 min avant repas.
- Glulisine (Apidra): Début 10-15 min, Pic 1-1,5h, Durée 3-5h. 0-15 min avant repas.
- Lispro (Humalog, Admelog): Début 10-15 min, Pic 1-2h, Durée 3,5-4,75h. 0-15 min avant repas.

Insulines à courte durée d'action:
- Humulin R, Novolin ge Toronto: Début 30 min, Pic 2-3h, Durée 6-8h. Environ 30 min avant repas.
- Entuzity 500 U/ml: Début 15 min, Pic 4-8h, Durée 17-24h. Environ 30 min avant repas.

Insulines à action intermédiaire:
- Humulin N, Novolin ge NPH: Début 1-3h, Pic 5-8h, Durée jusqu'à 24h. Le matin et/ou le soir.

Insulines à action prolongée (analogues):
- Degludec (Tresiba 100/200): Début 1h, Sans pic, Durée 42h. 1x/jour n'importe quel moment. Pas moins de 8h entre 2 doses.
- Détémir (Levemir): Début 1-2h, Sans pic, Durée jusqu'à 24h. Le matin et/ou le soir.
- Glargine 100 U/ml (Lantus, Semglee, Basaglar): Début 1-1,5h, Sans pic, Durée 24h. Le matin et/ou le soir.
- Glargine 300 U/ml (Toujeo): Début jusqu'à 6h, Sans pic, Durée 36h. 1x/jour à la même heure.

Insulines prémélangées:
- Humalog Mix 25/50: Début 10-15 min, Pic 1-2h et 5-8h, Durée jusqu'à 24h. 0-15 min avant repas.
- NovoMix 30: Début 10-20 min, Pic 1-4h, Durée jusqu'à 24h. 0-10 min avant repas.
- Novolin ge 30/70, Humulin 30/70: Début 30 min, Pic 2-3h et 5-8h, Durée jusqu'à 24h. Environ 30 min avant repas.

Initiation et titrage de l'insuline basale:
- Dose initiale: 10 U à tout moment de la journée ou 10 U au coucher/le matin.
- Titrage: 2 U tous les 3-4 jours OU 4 U 1 f.p.s. jusqu'à atteinte des objectifs (4-7 mmol/L) OU 1 U DIE jusqu'à atteinte des objectifs.
- Changement: 1:1 (↓ de 20% lorsque changé de TOUJEO ou d'une insuline BID).

MÉDICAMENTS COMBINÉS:

Inhibiteur de la DPP-4 + biguanide:
- Sitagliptine + Metformine (Janumet): Avec un repas, 2x/jour
- Sitagliptine + Metformine XR (Janumet XR): Avec un repas, 1x/jour, de préférence le soir
- Linagliptine + Metformine (Jentadueto): Avec un repas, 2x/jour
- Alogliptine + Metformine (Kazano): Avec un repas, 2x/jour
- Saxagliptine + Metformine (Komboglyze): Avec un repas, 2x/jour

Inhibiteur du SGLT2 + biguanide:
- Dapagliflozine + Metformine (Xigduo): Avec aliments, 2x/jour
- Canagliflozine + Metformine (Invokamet): Avec un repas, 2x/jour
- Empagliflozine + Metformine (Synjardy): Avec un repas, 2x/jour

Inhibiteur de la DPP-4 + inhibiteur du SGLT2:
- Empagliflozine + Linagliptine (Glyxambi): Avec ou sans aliments, même moment de la journée

Insuline + analogue du GLP-1:
- Insuline glargine 100 U/ml + Lixisénatide (Soliqua): Injection 1x/jour, dans l'heure qui précède le premier repas
- Insuline dégludec 100 U/ml + Liraglutide (Xultophy): Injection 1x/jour, avec ou sans aliments, n'importe quel moment, mais préférablement au même moment

Effets secondaires des combinaisons: Brûlures d'estomac, congestion nasale, douleur articulaire/musculaire, démangeaisons, constipation/diarrhée, mal de gorge, maux de tête, gaz, éruption cutanée, fatigue, indigestion, gêne abdominale, perte d'appétit, irritation de la gorge, grippe, maux de dos, douleurs aux extrémités, besoin fréquent d'uriner, soif, altération gustative, spasmes musculaires, nausées/vomissements, douleur abdominale, étourdissements, perte de poids, hypoglycémie, diminution de l'appétit, déshydratation.
`;

export const MPOC_CONTENT = `
MPOC - MALADIE PULMONAIRE OBSTRUCTIVE CHRONIQUE - F93

SUIVI INFIRMIER MPOC:

Éléments de surveillance:

Respiration:
- Dyspnée: Selon la perception du client
- Fréquence: B = bruyante, S = sifflante, T = tirage
- Repos, Élocution, AVQ (Activités de Vie Quotidienne), AVD (Activités de la Vie Journalière)

Toux:
- Ø = absente
- S = sèche
- G = grasse
- P = productive
- NP = non productive
- Q = quinteuse
- E = émétisante
- F = fréquente
- O = occasionnelle
- Quand: à préciser J = jour, N = nuit

Expectorations:
- Ø = absentes
- Volume: 15 ml (+), 15-30 ml (++), 30-100 ml (+++), 100 ml + (++++)
- Couleur: B = blanc, J = jaune, V = vert, S = sanguinolent
- Aspect: spécifier

Cyanose:
- Ø = absente
- D = digitale
- L = labiale
- MB = muqueuse buccale

Douleur thoracique:
- Ø = absente
- Selon échelle de douleur 1 à 10

Œdème:
- Ø = absent
- D = dur, G = à godet
- Léger = +, Moyen = ++, Important = +++
- Site: préciser (MI, MID, MIG)

Auscultation (dos):
- PC = poumons clairs
- MV↓ = murmure vésiculaire diminué
- R = ronchus
- S = sibilances
- C = crépitants
- FP = frottement pleural

Manifestations d'anxiété:
- Ø = absent
- L = Légère, M = Modérée, S = Sévère, P = Panique

Médication spécifique:
- A = prise adéquate
- I = prise inadéquate

Oxygène:
- Rx: Litres/min
- Ø = absent
- Utilisation: heures/24hrs
- Saturation: AA (Air Ambiant), Avec O₂

Signes cliniques d'hypoxie/hypercapnie:
- Ø = absent
- C = céphalée matinale
- A = agitation
- S = somnolence
- D = diaphorèse
- CO = confusion
- MC = modification du comportement
`;

export const SOINS_OPERATOIRES_CONTENT = `
SOINS PÉRIOPÉRATOIRES - F93

SOINS PRÉOPÉRATOIRES:

Rôle de l'infirmière en préopératoire: Préparation du client, évaluation, enseignement, consentement (pas à l'infirmière de faire signer).

Évaluation préopératoire:

Évaluation psychosociale:
- Peurs, anxiété, stress: évaluer cause (mort, douleur, modification image corporelle, anesthésie, etc.)
- Espoir: Ses attentes face à des résultats positifs
- Croyances et valeurs
- Soutien de sa famille/amis

Histoire de santé antérieure et actuelle:
- Antécédents familiaux et médicaux
- Problèmes liés à l'anesthésie
- Maladies actuelles
- Habitudes de vie: alimentaires, activités, sommeil, consommation (alcool, tabac, drogues)

Médicaments:
- Vente libre
- Sous ordonnance
- Produit naturel
- Obtenir le profil pharmacologique de la pharmacie

Allergies:
- Médicamenteuses
- Alimentaires
- Autres: latex
- Évaluer aussi la réaction à l'allergène

Évaluation des systèmes (cas par cas, selon la situation):
- Système nerveux
- Système respiratoire
- Système cardiovasculaire
- Système gastro-intestinal
- Système hépatique
- Système génito-urinaire
- Système tégumentaire
- Système musculosquelettique
- Système endocrinien

Examens paracliniques:
- ECG (obligatoire): Chez tous les clients âgés de 40 ans et plus (peut être fait quelques jours ou semaines avant) - Ordonnance collective
- Autres selon ordonnance médicale: groupe sanguin, FSC, coagulogramme, glycémie, créatinine, électrolytes, etc. selon antécédents, problèmes actuels, examen physique, âge, médication, type de chirurgie
- 2 prises de sang (selon la chirurgie)

Enseignement pré-op:
- Respiration profonde et technique de toux 10x q1-2h
- Inspirométrie 5 min q h
- Mobilisation précoce et exercices actifs/passifs au lit
- Prévention de la constipation
- Douleur: gestion de douleur, échelle de douleur, ACP (Analgésie Contrôlée par le Patient)/Épidurale/rachidienne prn
- Stratégies d'adaptation ex: imagerie mentale
- Respect des croyances: culturelles/spirituelles/religieuses
- Consignes alimentaires et hydriques Ex: NPO minuit la veille
- Préparation (peau, intestinales ou autre selon la chirurgie)
- Arrêt de certains médicaments 3-30 jours avant la chirurgie selon ordonnance médicale, ex: AINS, Anticoagulants
- Médicaments à prendre ou ne pas prendre le matin de la chirurgie

Consentement à la chirurgie:
- Libre et éclairé
- Pour toute chirurgie non urgente, la loi exige que le patient signe volontairement un consentement éclairé en présence d'un témoin selon les 3 conditions suivantes:
  1. Le patient ou la personne mandatée en cas d'inaptitude doit avoir eu une description adéquate du diagnostic, de la nature, et du but de traitement proposé, ainsi que de ses risques et des conséquences, de la probabilité de réussite de ce traitement, des autres traitements possibles, des avantages et des risques des autres traitements et du pronostic si le traitement n'est pas effectué
  2. Le patient ou la personne mandatée en cas d'inaptitude doit montrer qu'il comprend clairement l'information présentée avant de recevoir les médicaments sédatifs préopératoires
  3. Le patient ou la personne mandatée en cas d'inaptitude doit donner volontairement son consentement. Il ne doit pas être persuadé ou forcé de quelque façon que ce soit et par qui que ce soit de subir cette chirurgie

Préparation légale à la chirurgie:
- Possibilité de retirer son consentement à tout moment
- En urgence le consentement n'est pas obligatoire
- L'infirmière doit s'assurer que la personne n'a pas reçu de psychotrope avant de signer son consentement. On ne peut administrer un médicament qui affecte le jugement et la capacité à prendre une décision avant de signer un consentement

Préparation le jour de la chirurgie:
- À jeun
- Signes vitaux
- Autres évaluations PRN selon les systèmes
- Allergies et bracelet d'allergie PRN
- Médication à cesser ou à prendre
- Consentements signés
- Rasage, hygiène, aucun bijou, piercing, maquillage, vernis à ongles, prothèses dentaires
- Examens paracliniques selon ordonnance
- BHCG (obligatoire le matin de la chirurgie): Chez toutes les femmes non ménopausées (Code 50)
- Compléter l'enseignement, rassurer et répondre aux questions
- Aviser d'aller uriner
- Notes au dossier

SOINS PEROPÉRATOIRES:

Fonction de l'infirmière:

Service interne (instrumentiste):
- Lavage chirurgical des mains + s'assurer zone stérile
- Prépare tout le matériel et le fournit incluant les échantillons prélevés
- Décompte du matériel avec service externe

Service externe (circulante):
- Planification, organisation de SO et coordination interne/externe
- Sécurité et bien-être de la personne
- Vérification du consentement
- Consigne au dossier les activités particulières

Assistance chirurgicale:
- Supervision directe du chirurgien

Quatre niveaux de sédation/anesthésie:

1. Sédation consciente:
- Répond normalement, fonctions cardio-vasculaires et respiratoires maintenues

2. Anesthésie locale:
- Provoque une interruption temporaire des signaux le long des nerfs (en modifiant l'introduction du sodium dans les cellules nerveuses, bloque les canaux sodiques qui transmettent les influx nerveux, sensoriels et moteurs)

3. Anesthésie régionale (anesthésie par bloc nerveux):
- On injecte un anesthésique local dans un nerf central ou un groupe de nerfs qui correspondent à une région déterminée (plexus brachial, fémoral, sciatique)
- Utilisée pour: anesthésie peropératoire, analgésie postopératoire, douleur chronique

Anesthésie régionale rachidienne:
- On injecte un anesthésique local dans le liquide céphalo-rachidien de l'espace sous-arachnoïdien habituellement sous L2 car ce site est plus facile à localiser et est plus facilement accessible
- Bloque les fonctions autonomes (vasodilatation = hypotension), sensorielles (absence de douleur) et motrices (absence de motricité)
- Durée: varie selon la dose et l'agent utilisé
- Indication: interventions des membres inférieurs, G-I basse, prostate et gynécologique

Anesthésie régionale épidurale:
- On injecte un anesthésique local dans l'espace épidural entre 2 vertèbres thoraciques ou lombaires qui se lie aux racines nerveuses
- À faible dose, bloque les fibres des nerfs sensitifs (sensibilité) mais pas celles des nerfs moteurs (motricité)
- À forte dose, bloque les fibres des nerfs sensitifs (sensibilité) et celles des nerfs moteurs (motricité)
- Indication: obstétrique et chirurgie vasculaire ou orthopédiques des membres inférieurs
- On peut laisser le cathéter en place pour injecter en continue une association d'anesthésique local et un opioïde afin d'assurer le soulagement de la douleur en continue en période postopératoire

Comparaison épidural et rachidien:
- Rachidienne: Délais d'action plus court, agit plus sur le SNA (donc risque ↑ d'hypotension, bradycardie, nausée, vomissement), plus facile à faire comme technique
- Épidurale: Délais d'action plus long, agit moins sur le SNA (donc moins d'hypotension, bradycardie, nausée, vomissement), plus difficile comme technique

4. Anesthésie générale:
- Provoque: Perte de sensation + conscience, Relaxation des muscles squelettiques, Dépression possible des fonctions cardiovasculaire et respiratoire
- Clientèle cible:
  - Intervention de longue durée ou contre-indication aux autres anesthésies
  - Relaxation musculaire profonde nécessaire ou surveillance respiratoire
  - Position inconfortable nécessaire à la chirurgie
  - Anxieux ++ ou non collaborant

SOINS POSTOPÉRATOIRES:

Service en salle de réveil:
- Déplacement avec anesthésiste, infirmière, inhalothérapeute
- Rapport transmis à l'infirmière par l'anesthésiste
- Demeure en salle de réveil 1-2h
- Évaluation initiale par l'infirmière

Préparation de la chambre:
- Succion au mur fonctionnelle
- Débitmètre pour O₂ en place
- Feuilles SV (Signes Vitaux), I/E (Intrants/Excrétions)
- Thermomètre
- Tige à soluté et pompe volumétrique
- Haricot
- Bassine/urinal
- Lit surélevé

Dossier: opératoire et ordonnance médicale:
- Voir ordonnance médicale postopératoire
- Voir feuille salle de réveil
- Voir feuille anesthésie

Informations pertinentes feuille salle de réveil et anesthésie:
- Heure d'arrivée en salle de réveil
- Note infirmière de la salle de réveil
- Tendance des SV
- Médication reçue pour planifier les doses futures: antibiotique et analgésique
- Quantité totale de solutés reçus
- Perte sanguine estimée durant la chirurgie
- Type d'anesthésie reçu

Soins infirmiers en postopératoire - Évaluation:
- État général, émotionnel
- SV (Signes Vitaux)
- Nausées-vomissements (tube nasogastrique si en place)
- État de sédation - l'échelle de Pasero
- Douleur
- Pansement-plaie-drain
- Soluté
- État urinaire (miction ou sonde vésicale)
- Mobilité sensibilité (si anesthésie régionale)
- Signes neurologie (si neurochirurgie)
- Signes neurovasculaire (si chirurgie vasculaire ou orthopédique)

Soins infirmiers en postopératoire - Intervention:
- Cloche d'appel à la portée du client
- Position confortable et sécuritaire de manière à dégager les voies respiratoires (tête de lit, ridelles, etc.)
- Position particulière selon la chirurgie (soulever un membre, etc.)
- Exécuter les ordonnances:
  - Soulager la douleur
  - Soulager les nausées-vomissements
  - Administrer les antibiotiques ou autres médicaments prescrits
  - Rassurer au besoin
  - Faire faire les exercices respiratoires
  - Répondre aux questions et enseigner selon les besoins du client
  - Effectuer le premier lever

1er lever postopératoire:
- Toujours à deux personnes dont au moins une infirmière
- SV et analgésique avant de mobiliser
- On commence par asseoir le patient sur le bord du lit
- Fait le soir même de la chirurgie ou le lendemain matin au déjeuner selon l'ordonnance médicale
- Évaluer la tolérance du patient: Étourdissement, nausées, diaphorèse, dyspnée. Si un ou des signes sont présents, recoucher le patient et prendre les SV (hypotension orthostatique)
- Durée 15-30 minutes maximum. Il vaut mieux se lever plus souvent et moins longtemps
- Fixer nos objectifs de façon réaliste selon la chirurgie et le patient
- Enseigner au patient les objectifs de la mobilisation précoce
- NB: Chaque patient est unique selon sa personnalité, ses antécédents, ses connaissances, ses expériences et sa motivation
`;

export const DAV_CONTENT = `
SOINS DES DISPOSITIFS D'ACCÈS VASCULAIRE - F93

IRRIGATION ET VERROUILLAGE DES DAV INTRAVEINEUX:

Cathéter intraveineux périphérique (CIVP) court, long ou Midline:

| Type | Volume minimal | Fréquence |
|------|---------------|-----------|
| CIVP-court | 3 à 5 mL | Pré et post accès au CIVP (ex: administration de médicaments/solutions) |
| CIVP-long | 3 à 5 mL | Une fois par quart (ex: aux 8 à 12 h) ou minimalement une fois par jour (aux 24 h) |
| Midline | 3 à 5 mL | Une fois par quart (ex: aux 8 à 12 h) ou minimalement une fois par jour (aux 24 h) |

Irrigation et verrouillage avec NaCl 0,9% sans agent de conservation

DAV central non tunnellisé, tunnellisé et inséré par voie périphérique (PICC Line):

| Type | Volume minimal | Fréquence |
|------|---------------|-----------|
| Non tunnellisé | 10 mL | Pré et post accès au DAVC |
| Tunnellisé | 10 mL | Pré et post accès au DAVC |
| PICC Line | 10 mL | Pré et post accès au DAVC |

Verrouillage:
- Non tunnellisé: 1,5 mL (lumière utilisée par intermittence), 1 fois/semaine (lumière inutilisée)
- Tunnellisé: 1,5 OU 2,5 mL (lumière utilisée par intermittence), 1 fois/semaine (lumière inutilisée)
- PICC Line: 1,5 mL (lumière utilisée par intermittence), 1 fois/semaine (lumière inutilisée)

Dispositif d'accès vasculaire implantable (DAVI):

| Utilisation | Irrigation | Verrouillage | Fréquence |
|-------------|------------|--------------|-----------|
| Utilisé par intermittence | 10 mL | 2,5 à 5 mL d'héparine 100 unités/mL | Pré et post accès au DAVI |
| Non utilisé mais aiguille en place | 10 mL | 2,5 à 5 mL d'héparine 100 unités/mL | Aux 24 h |
| Lumière inutilisée (sans aiguille) | 10 mL | 2,5 à 5 mL d'héparine 100 unités/mL | Aux 4 à 6 semaines (pourrait aller jusqu'à 12 semaines) |

Séquence de clampage:

| Mécanisme du connecteur | Séquence requise |
|------------------------|------------------|
| Déplacement positif | 1. Dévisser la seringue 2. Clamper le DAV |
| Déplacement négatif | 1. Clamper le DAV en maintenant la pression sur le piston de la seringue 2. Dévisser la seringue |
| Neutre | Aucune séquence particulière requise OU: 1. Clamper le DAV en maintenant la pression sur le piston de la seringue 2. Dévisser la seringue |
| Antireflux | Aucune séquence particulière requise (clamper le DAV avant OU après avoir dévissé la seringue du site d'accès) |

Notes:
1. Rincer d'abord avec le dextrose 5%, si médication incompatible avec le NaCl 0,9%, puis irriguer avec le NaCl 0,9%
2. Les solutions de verrouillage sont: NaCl 0,9% (le volume requis pour le verrouillage est généralement inclus dans le volume de 10mL recommandé pour l'irrigation), héparine 10 unités/mL ou selon recommandations du fabricant, héparine 100 unités/mL pour le DAVI non utilisé entretenu aux 3 mois, solution antimicrobienne (doit être aspirée avant d'irriguer)
3. Le volume nécessaire pour irriguer le DAV correspond minimalement au double du volume interne du DAV et des ajouts; le volume nécessaire pour verrouiller le DAV correspond au volume interne du DAV et de ses ajouts + 20% du volume total
4. Après l'administration d'un médicament visqueux ou d'un prélèvement sanguin: un volume de 20 mL est recommandé
5. Peut varier: Suivre les recommandations du fabricant ou le protocole de l'établissement

SOINS ET SURVEILLANCES DU CIVP-COURT OU LONG:

Site d'insertion:
- Fréquence:
  - Établissement: Minimum à chaque quart
  - Domicile/Externe: Minimum à la visite
  - Avant utilisation
  - Perfusion non vésicante/non irritante: Adulte alerte et orienté: Aux 4 h; Usagers incapables de communiquer: Aux 2 h; Clientèle pédiatrique/néonatale: Aux 1 h
  - Perfusion vésicante/irritante: Plus fréquemment
  - Au besoin

- Signes et symptômes:
  - Érythème
  - Œdème
  - Changement cutané (ex: chaleur, ecchymose)
  - Fuite/écoulement
  - Induration
  - Cordon veineux
  - Douleur/inconfort

- Interventions:
  - Arrêter perfusion en cours
  - Changer CIVP et site

Pansement et dispositif de stabilisation:
- Fréquence:
  - Établissement: Minimum à chaque quart
  - Domicile/Externe: Minimum à la visite
  - Au besoin

- Signes et symptômes:
  - Souillures
  - Intégrité compromise (ex: décollement partiel)
  - Non perméable

- Interventions:
  - Changer pansement et dispositif de stabilisation
  - Pellicule transparente: Aux 7 jours maximum
  - Gazes où le site est camouflé: Aux 48 h
  - Au besoin (ex: signes de complications)
  - Après 24 à 48h si installé dans des conditions d'asepsie sous optimales

CIVP:
- Fréquence:
  - Établissement: Minimum à chaque quart
  - Domicile/Externe: Minimum à la visite
  - Au besoin

- Signes et symptômes:
  - Déplacé
  - Débris
  - Contamination

- Interventions:
  - Changer CIVP et site
  - Retirer le CIVP si non utilisé depuis plus de 24 h

Ajouts au CIVP (ex: connecteur sans aiguille, rallonge, capuchon antiseptique):
- Fréquence:
  - Établissement: Minimum à chaque quart
  - Domicile/Externe: Minimum à la visite
  - Avant utilisation
  - Au besoin

- Signes et symptômes:
  - Intégrité compromise
  - Aucun retour veineux

- Interventions:
  - Changer connecteur sans aiguille
  - Perfusion continue: Aux 96 h maximum
  - Mode intermittent/usager à domicile: Aux 7 jours maximum
  - Dès que retiré du CIVP/rallonge
  - Au besoin
  - Changer la rallonge au remplacement du CIVP et au besoin
  - Changer le capuchon antiseptique aux 7 jours, à chaque accès au connecteur et au besoin

Note: Le retour veineux peut être absent même si le CIVP est perméable MAIS est requis pour administrer une perfusion vésicante/irritante.

Enseignement: Enseigner les signes et symptômes à surveiller à l'usager/proche aidant au moins une fois par jour si aucune perfusion en cours et/ou aux 4 heures si perfusion en cours et usager éveillé.
`;

export const TOPICS: Topic[] = [
  {
    id: 'cardio',
    title: 'Cardiologie',
    description: 'Fibrillation auriculaire, insuffisance cardiaque, SCA, HTA.',
    content: CARDIO_CONTENT
  },
  {
    id: 'diabete',
    title: 'Diabète & Antihyperglycémiants',
    description: 'Médicaments, insulines, combinaisons et enseignements.',
    content: DIABETE_CONTENT
  },
  {
    id: 'mpoc',
    title: 'MPOC - Suivi Infirmier',
    description: 'Surveillance respiratoire, toux, expectorations, oxygène.',
    content: MPOC_CONTENT
  },
  {
    id: 'soins-operatoires',
    title: 'Soins Periopératoires',
    description: 'Préopératoire, peropératoire, postopératoire, anesthésies.',
    content: SOINS_OPERATOIRES_CONTENT
  },
  {
    id: 'dav',
    title: 'Dispositifs d\'Accès Vasculaire',
    description: 'CIVP, DAVC, DAVI, irrigation, verrouillage, surveillances.',
    content: DAV_CONTENT
  }
];

export const getSystemInstruction = (content: string, difficulty: DifficultyLevel = 'intermediaire', mode: QuizMode = 'chat') => {
  const difficultyInstructions = {
    debutant: `
Difficulty Level: BEGINNER (Débutant)
- Ask simple recall questions focusing on basic definitions, key terms, and fundamental concepts.
- Questions should test memory and recognition of important facts.
- Use straightforward language and avoid complex scenarios.
- Provide more guidance and hints in your feedback.
- Example: "Qu'est-ce que...?", "Définissez...", "Quel est le symptôme principal de...?"`,
    intermediaire: `
Difficulty Level: INTERMEDIATE (Intermédiaire)
- Ask questions that require understanding and application of concepts.
- Include questions about processes, comparisons, and clinical manifestations.
- Test the ability to connect related concepts.
- Provide moderate detail in your feedback.
- Example: "Expliquez le mécanisme de...", "Quelles sont les différences entre...?", "Décrivez les manifestations cliniques de..."`,
    avance: `
Difficulty Level: ADVANCED (Avancé)
- Ask complex questions requiring critical thinking and clinical judgment.
- Include scenario-based questions, prioritization, and multi-step reasoning.
- Test deep understanding of pathophysiology, pharmacology, and nursing interventions.
- Provide concise feedback with references to specific details.
- Example: "Dans un scénario de... quelle serait votre priorité d'intervention?", "Analysez la situation suivante...", "Justifiez le choix de ce traitement..."`
  };

  const modeInstructions = mode === 'qcm' ? `
⚠️ CRITICAL: QUIZ MODE IS MULTIPLE CHOICE (QCM) ⚠️

FORMATTAGE DES QUESTIONS:
- You MUST format EVERY question as a multiple choice question with exactly 4 options.
- Label options as A), B), C), D) - each on its own line.
- Only ONE option should be correct.
- Do NOT reveal the answer in the question.
- IMPORTANT: Les options de réponse doivent être textuelles et descriptives. Si la réponse attendue est une courte abréviation ou un sigle, vous DEVEZ inclure sa signification complète (ex: "A) S - Toux sèche" au lieu de simplement "A) S"). Ne JAMAIS générer une option contenant une seule lettre ou un seul mot court non explicite.

FORMATTAGE DES RÉPONSES (FEEDBACK):
- After the user answers, provide feedback on a SINGLE line using this format:
  "✅ Correct — [explication brève]" OR "❌ Incorrect — [explication brève]"
- Use a simple line break (blank line) to separate feedback from the next question.
- NEVER use *** or --- or any separator lines.
- NEVER use bold (**) in the feedback line.

EXEMPLE DE FORMAT:
"Question: Quelle est la définition de l'insuffisance cardiaque?

A) Incapacité du cœur à pomper suffisamment de sang
B) Augmentation de la fréquence cardiaque
C) Diminution de la pression artérielle
D) Inflammation des artères coronaires"

After user answers:
"✅ Correct — Selon le contenu, l'IC est l'incapacité du cœur à pomper suffisamment de sang pour répondre aux besoins métaboliques.

Question: Quel est le symptôme principal de l'IC gauche?

A) Œdème périphérique
B) Congestion pulmonaire et dyspnée
C) Hépatomégalie
D) Ascite"

IMPORTANT:
- NEVER ask open-ended questions in QCM mode. ALWAYS provide 4 options.
- Keep feedback concise (1 sentence max).
- Use ✅ or ❌ emoji to indicate correct/incorrect.
` : `
Quiz Mode: CHAT (Conversation)
- Ask open-ended questions and engage in a conversational quiz format.
- Allow the user to respond in their own words.
- Provide feedback and continue the conversation naturally.
`;

  return `
You are a helpful study companion specialized in the selected nursing topic.
Your task is to ask questions based EXACTLY and ONLY on the provided content to help with revision.
Do not use outside knowledge.

=== QUIZ CONFIGURATION ===
Mode: ${mode === 'qcm' ? 'MULTIPLE CHOICE (QCM) - MUST use 4 options' : 'CONVERSATION - Open-ended questions'}
Difficulty: ${difficulty.toUpperCase()}
===========================

${modeInstructions}

${difficultyInstructions[difficulty]}

Rules:
1.  Language: French ONLY.
2.  Format:
    -   Ask ONE question at a time.
    -   Wait for the answer.
    -   When the answer is received, provide:
        -   Status: "Correct" or "Incorrect".
        -   A very brief explanation (1-2 sentences max) citing the context from the provided text.
    -   Then, immediately ask the next question.
3.  Content: Use specific details from the provided text ONLY.
4.  Restart: If the user asks to restart or says "recommencer", clear memory and start with a new first question.
5.  Tone: Professional, encouraging, and helpful. Do not act as a teacher assessing a student, but as a tool for self-revision.
6.  If the content provided is a placeholder, inform the user that questions cannot be generated yet.
7.  Difficulty: Adapt your questions to the selected difficulty level (${difficulty}).
8.  Mode: ${mode === 'qcm' ? 'USE MULTIPLE CHOICE FORMAT WITH 4 OPTIONS FOR EVERY QUESTION' : 'USE CONVERSATIONAL OPEN-ENDED FORMAT'}.

Content to quiz on:
${content}
`;
};
