import {
  Heart,
  Award,
  Brain,
  Activity,
  Thermometer,
  Stethoscope,
  Pill,
  Syringe,
  Clipboard,
  Microscope,
  TreesIcon as Lungs,
  Droplet,
  WormIcon as Virus,
  BugIcon as Bacteria,
  AmbulanceIcon as FirstAid,
  LigatureIcon as Bandage,
  Bone,
  Eye,
  Ear,
  Dna,
} from "lucide-react"
import type { ReactNode } from "react"

export interface Question {
  id: number
  question: string
  options: string[]
  answer: string
  icon: ReactNode
  funFact: string
  category?: string
}

// Track which questions have been used to avoid repetition
const usedQuestionIds: Set<number> = new Set()

// Master database of all questions
export const allQuestions: Question[] = [
  // Original questions
  {
    id: 1,
    question: "What is the normal resting heart rate for adults?",
    options: ["50-70 bpm", "60-100 bpm", "100-120 bpm", "40-60 bpm"],
    answer: "60-100 bpm",
    icon: <Heart className="h-6 w-6 text-red-500" />,
    funFact: "The heart beats about 2.5 billion times in an average lifetime!",
    category: "Vital Signs",
  },
  {
    id: 2,
    question: "Which of these is NOT one of the vital signs?",
    options: ["Blood pressure", "Temperature", "Cholesterol level", "Respiratory rate"],
    answer: "Cholesterol level",
    icon: <Activity className="h-6 w-6 text-green-500" />,
    funFact: "Vital signs are measurements of the body's most basic functions.",
    category: "Vital Signs",
  },
  {
    id: 3,
    question: "What is the medical term for low blood sugar?",
    options: ["Hyperglycemia", "Hypoglycemia", "Hypotension", "Hypertension"],
    answer: "Hypoglycemia",
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    funFact: "The brain uses about 20% of the body's glucose!",
    category: "Medical Terminology",
  },
  {
    id: 4,
    question: "Which nursing pioneer is known as 'The Lady with the Lamp'?",
    options: ["Clara Barton", "Florence Nightingale", "Mary Seacole", "Virginia Henderson"],
    answer: "Florence Nightingale",
    icon: <Award className="h-6 w-6 text-yellow-500" />,
    funFact: "Florence Nightingale was a statistician who created innovative charts to show causes of mortality.",
    category: "Nursing History",
  },
  {
    id: 5,
    question: "What is the most common type of shock?",
    options: ["Cardiogenic shock", "Hypovolemic shock", "Neurogenic shock", "Septic shock"],
    answer: "Hypovolemic shock",
    icon: <Activity className="h-6 w-6 text-blue-500" />,
    funFact: "The body has amazing compensatory mechanisms to maintain blood pressure during early shock.",
    category: "Emergency Care",
  },
  {
    id: 6,
    question: "What is the normal body temperature in Fahrenheit?",
    options: ["96.8°F", "97.8°F", "98.6°F", "99.6°F"],
    answer: "98.6°F",
    icon: <Thermometer className="h-6 w-6 text-red-500" />,
    funFact: "Body temperature varies throughout the day, typically being lowest in the early morning!",
    category: "Vital Signs",
  },
  {
    id: 7,
    question: "Which of these is NOT a type of white blood cell?",
    options: ["Neutrophil", "Lymphocyte", "Erythrocyte", "Monocyte"],
    answer: "Erythrocyte",
    icon: <Microscope className="h-6 w-6 text-purple-500" />,
    funFact: "Erythrocytes are red blood cells, which carry oxygen throughout the body.",
    category: "Anatomy",
  },
  {
    id: 8,
    question: "What is the largest organ in the human body?",
    options: ["Liver", "Brain", "Skin", "Large intestine"],
    answer: "Skin",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact: "The skin of an average adult weighs about 8-10 pounds and covers approximately 22 square feet!",
    category: "Anatomy",
  },
  {
    id: 9,
    question: "Which medication is used to reverse opioid overdose?",
    options: ["Epinephrine", "Naloxone", "Atropine", "Flumazenil"],
    answer: "Naloxone",
    icon: <Syringe className="h-6 w-6 text-blue-500" />,
    funFact: "Naloxone can restore normal breathing within 2-3 minutes in a person overdosing on opioids.",
    category: "Pharmacology",
  },
  {
    id: 10,
    question: "What is the medical term for high blood pressure?",
    options: ["Hypotension", "Hypertension", "Hyperglycemia", "Hyperthermia"],
    answer: "Hypertension",
    icon: <Activity className="h-6 w-6 text-green-500" />,
    funFact: "Hypertension is often called the 'silent killer' because it typically has no symptoms.",
    category: "Medical Terminology",
  },
  {
    id: 11,
    question: "Which of these is NOT a route of medication administration?",
    options: ["Intramuscular", "Subcutaneous", "Intraosseous", "Intracardiac"],
    answer: "Intracardiac",
    icon: <Pill className="h-6 w-6 text-pink-500" />,
    funFact:
      "While intracardiac injections exist, they're extremely rare in modern medicine and typically only used in extreme emergencies.",
    category: "Pharmacology",
  },
  {
    id: 12,
    question: "What is the normal respiratory rate for adults?",
    options: [
      "8-12 breaths per minute",
      "12-20 breaths per minute",
      "20-30 breaths per minute",
      "30-40 breaths per minute",
    ],
    answer: "12-20 breaths per minute",
    icon: <Activity className="h-6 w-6 text-blue-500" />,
    funFact: "We typically breathe about 20,000 times per day!",
    category: "Vital Signs",
  },
  {
    id: 13,
    question: "Which nursing theorist developed the 'Theory of Human Caring'?",
    options: ["Jean Watson", "Virginia Henderson", "Dorothea Orem", "Betty Neuman"],
    answer: "Jean Watson",
    icon: <Heart className="h-6 w-6 text-red-500" />,
    funFact:
      "Watson's theory emphasizes that caring is central to nursing practice and promotes health better than simple medical cure.",
    category: "Nursing Theory",
  },
  {
    id: 14,
    question: "What is the medical term for a nosebleed?",
    options: ["Epistaxis", "Hemoptysis", "Hematemesis", "Hematuria"],
    answer: "Epistaxis",
    icon: <Stethoscope className="h-6 w-6 text-gray-500" />,
    funFact: "The most common cause of nosebleeds is dry air that dries out the nasal membranes.",
    category: "Medical Terminology",
  },
  {
    id: 15,
    question: "Which of these is NOT a cranial nerve?",
    options: ["Vagus nerve", "Facial nerve", "Sciatic nerve", "Olfactory nerve"],
    answer: "Sciatic nerve",
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    funFact: "The sciatic nerve is the largest nerve in the body, running from the lower back down through the legs.",
    category: "Anatomy",
  },

  // MANY MORE QUESTIONS - Anatomy & Physiology
  {
    id: 16,
    question: "Which chamber of the heart pumps blood to the lungs?",
    options: ["Left ventricle", "Right ventricle", "Left atrium", "Right atrium"],
    answer: "Right ventricle",
    icon: <Heart className="h-6 w-6 text-red-500" />,
    funFact:
      "The right ventricle has walls that are thinner than the left ventricle because it pumps blood a shorter distance.",
    category: "Anatomy",
  },
  {
    id: 17,
    question: "What is the name of the membrane that surrounds the lungs?",
    options: ["Peritoneum", "Pericardium", "Pleura", "Meninges"],
    answer: "Pleura",
    icon: <Lungs className="h-6 w-6 text-blue-500" />,
    funFact: "The pleural space contains a small amount of fluid that helps reduce friction during breathing.",
    category: "Anatomy",
  },
  {
    id: 18,
    question: "Which of the following is NOT a function of the liver?",
    options: ["Detoxification", "Protein synthesis", "Bile production", "Insulin production"],
    answer: "Insulin production",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact: "Insulin is produced by the beta cells of the pancreas, not the liver.",
    category: "Physiology",
  },
  {
    id: 19,
    question: "What is the normal pH range of blood?",
    options: ["6.8-7.2", "7.35-7.45", "7.5-8.0", "5.5-6.5"],
    answer: "7.35-7.45",
    icon: <Droplet className="h-6 w-6 text-red-500" />,
    funFact:
      "Even small changes in blood pH can be life-threatening, which is why the body has multiple buffer systems.",
    category: "Physiology",
  },
  {
    id: 20,
    question: "Which hormone regulates calcium levels in the blood?",
    options: ["Insulin", "Glucagon", "Parathyroid hormone", "Aldosterone"],
    answer: "Parathyroid hormone",
    icon: <Bone className="h-6 w-6 text-gray-500" />,
    funFact: "The parathyroid glands are four tiny glands located on the back of the thyroid gland.",
    category: "Physiology",
  },

  // Pharmacology
  {
    id: 21,
    question: "Which of these medications is a beta-blocker?",
    options: ["Lisinopril", "Metoprolol", "Amlodipine", "Furosemide"],
    answer: "Metoprolol",
    icon: <Pill className="h-6 w-6 text-pink-500" />,
    funFact: "Beta-blockers work by blocking the effects of adrenaline (epinephrine) on beta-receptors.",
    category: "Pharmacology",
  },
  {
    id: 22,
    question: "What class of medication is Warfarin?",
    options: ["Antibiotic", "Anticoagulant", "Antihypertensive", "Antidepressant"],
    answer: "Anticoagulant",
    icon: <Droplet className="h-6 w-6 text-red-500" />,
    funFact: "Warfarin was originally developed as a rat poison before its medical applications were discovered.",
    category: "Pharmacology",
  },
  {
    id: 23,
    question: "Which medication would you administer during a severe allergic reaction?",
    options: ["Albuterol", "Epinephrine", "Diphenhydramine", "Prednisone"],
    answer: "Epinephrine",
    icon: <Syringe className="h-6 w-6 text-blue-500" />,
    funFact: "Epinephrine auto-injectors were invented in the 1970s by Sheldon Kaplan.",
    category: "Pharmacology",
  },
  {
    id: 24,
    question: "What is the antidote for acetaminophen (Tylenol) overdose?",
    options: ["Naloxone", "Flumazenil", "N-acetylcysteine", "Activated charcoal"],
    answer: "N-acetylcysteine",
    icon: <FirstAid className="h-6 w-6 text-green-500" />,
    funFact:
      "N-acetylcysteine works by replenishing glutathione stores in the liver, which helps detoxify acetaminophen.",
    category: "Pharmacology",
  },
  {
    id: 25,
    question: "Which of these is a common side effect of opioid medications?",
    options: ["Hypertension", "Diarrhea", "Constipation", "Hyperactivity"],
    answer: "Constipation",
    icon: <Pill className="h-6 w-6 text-pink-500" />,
    funFact:
      "Opioids slow down peristalsis in the intestines, leading to constipation in nearly all patients who take them regularly.",
    category: "Pharmacology",
  },

  // Medical Terminology
  {
    id: 26,
    question: "What does the prefix 'tachy-' mean?",
    options: ["Slow", "Fast", "Painful", "Difficult"],
    answer: "Fast",
    icon: <Activity className="h-6 w-6 text-green-500" />,
    funFact: "Tachycardia refers to a heart rate over 100 beats per minute in adults.",
    category: "Medical Terminology",
  },
  {
    id: 27,
    question: "What does the suffix '-ectomy' indicate?",
    options: ["Examination of", "Surgical removal", "Disease of", "Inflammation"],
    answer: "Surgical removal",
    icon: <Syringe className="h-6 w-6 text-blue-500" />,
    funFact: "Appendectomy, tonsillectomy, and hysterectomy are all common surgical procedures ending with -ectomy.",
    category: "Medical Terminology",
  },
  {
    id: 28,
    question: "What does 'dyspnea' refer to?",
    options: ["Difficulty swallowing", "Difficulty breathing", "Difficulty speaking", "Difficulty urinating"],
    answer: "Difficulty breathing",
    icon: <Lungs className="h-6 w-6 text-blue-500" />,
    funFact: "Dyspnea can be measured using the Borg scale or the Medical Research Council (MRC) breathlessness scale.",
    category: "Medical Terminology",
  },
  {
    id: 29,
    question: "What does 'NPO' stand for?",
    options: [
      "No Physician Orders",
      "Normal Postoperative Outcome",
      "Nothing Per Oral",
      "Nursing Protocol Observation",
    ],
    answer: "Nothing Per Oral",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact: "NPO comes from the Latin 'nil per os' which literally means 'nothing by mouth'.",
    category: "Medical Terminology",
  },
  {
    id: 30,
    question: "What does the abbreviation 'PRN' mean?",
    options: ["Patient Recovery Notice", "Prescribed Right Now", "As Needed", "Partial Response Noted"],
    answer: "As Needed",
    icon: <Pill className="h-6 w-6 text-pink-500" />,
    funFact: "PRN comes from the Latin 'pro re nata' which means 'as the circumstance arises'.",
    category: "Medical Terminology",
  },

  // Nursing Procedures
  {
    id: 31,
    question: "What is the correct angle for an intramuscular injection in adults?",
    options: ["15 degrees", "45 degrees", "90 degrees", "180 degrees"],
    answer: "90 degrees",
    icon: <Syringe className="h-6 w-6 text-blue-500" />,
    funFact:
      "The vastus lateralis muscle in the thigh is often preferred for IM injections because it has few major blood vessels or nerves.",
    category: "Nursing Procedures",
  },
  {
    id: 32,
    question: "Which position is best for preventing aspiration during feeding?",
    options: ["Supine", "Trendelenburg", "Fowler's", "Prone"],
    answer: "Fowler's",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact: "Fowler's position elevates the head of the bed between 30 and 90 degrees, helping prevent reflux.",
    category: "Nursing Procedures",
  },
  {
    id: 33,
    question: "What is the first step in performing CPR?",
    options: ["Give rescue breaths", "Check for a pulse", "Call for help", "Check responsiveness"],
    answer: "Check responsiveness",
    icon: <Heart className="h-6 w-6 text-red-500" />,
    funFact: "Modern CPR was developed in the 1960s, combining mouth-to-mouth resuscitation with chest compressions.",
    category: "Nursing Procedures",
  },
  {
    id: 34,
    question: "Which of these is NOT a component of a proper handwashing technique?",
    options: [
      "Wetting hands before applying soap",
      "Scrubbing for at least 20 seconds",
      "Drying with a clean towel",
      "Using hot water only",
    ],
    answer: "Using hot water only",
    icon: <Droplet className="h-6 w-6 text-blue-500" />,
    funFact:
      "Warm water is recommended for handwashing as hot water can damage skin and cold water may not effectively remove oils.",
    category: "Nursing Procedures",
  },
  {
    id: 35,
    question: "What is the purpose of the Glasgow Coma Scale?",
    options: [
      "Assess pain levels",
      "Evaluate level of consciousness",
      "Measure blood glucose",
      "Determine nutritional status",
    ],
    answer: "Evaluate level of consciousness",
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    funFact:
      "The Glasgow Coma Scale was developed in 1974 at the University of Glasgow by Graham Teasdale and Bryan Jennett.",
    category: "Nursing Procedures",
  },

  // Diseases & Conditions
  {
    id: 36,
    question: "Which of these is a symptom of diabetic ketoacidosis?",
    options: ["Bradycardia", "Hypertension", "Fruity breath odor", "Weight gain"],
    answer: "Fruity breath odor",
    icon: <Droplet className="h-6 w-6 text-red-500" />,
    funFact:
      "The fruity breath odor in DKA is due to acetone, a ketone body produced when the body burns fat instead of glucose.",
    category: "Diseases",
  },
  {
    id: 37,
    question: "What is the most common type of stroke?",
    options: ["Hemorrhagic stroke", "Ischemic stroke", "Transient ischemic attack", "Cryptogenic stroke"],
    answer: "Ischemic stroke",
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    funFact:
      "About 87% of all strokes are ischemic strokes, caused by a blockage in an artery that supplies blood to the brain.",
    category: "Diseases",
  },
  {
    id: 38,
    question: "Which condition is characterized by inflammation of the appendix?",
    options: ["Cholecystitis", "Diverticulitis", "Appendicitis", "Gastritis"],
    answer: "Appendicitis",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact:
      "The appendix was once thought to be a vestigial organ, but research suggests it may play a role in the immune system.",
    category: "Diseases",
  },
  {
    id: 39,
    question: "What is the most common cause of community-acquired pneumonia?",
    options: ["Streptococcus pneumoniae", "Haemophilus influenzae", "Mycoplasma pneumoniae", "Klebsiella pneumoniae"],
    answer: "Streptococcus pneumoniae",
    icon: <Bacteria className="h-6 w-6 text-green-500" />,
    funFact: "Streptococcus pneumoniae was first isolated by Louis Pasteur in 1881.",
    category: "Diseases",
  },
  {
    id: 40,
    question: "Which of these is NOT a risk factor for osteoporosis?",
    options: ["Female gender", "Advanced age", "High calcium intake", "Smoking"],
    answer: "High calcium intake",
    icon: <Bone className="h-6 w-6 text-gray-500" />,
    funFact: "Adequate calcium intake actually helps prevent osteoporosis by maintaining bone density.",
    category: "Diseases",
  },

  // Patient Care
  {
    id: 41,
    question: "What is the best way to prevent pressure ulcers in bedridden patients?",
    options: ["Massage bony prominences", "Reposition every 4 hours", "Reposition every 2 hours", "Use donut cushions"],
    answer: "Reposition every 2 hours",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact: "Pressure ulcers can develop in as little as 2-3 hours in patients with compromised circulation.",
    category: "Patient Care",
  },
  {
    id: 42,
    question: "Which of these is a sign of dehydration?",
    options: ["Moist mucous membranes", "Decreased heart rate", "Decreased urine output", "Low blood pressure"],
    answer: "Decreased urine output",
    icon: <Droplet className="h-6 w-6 text-blue-500" />,
    funFact: "The color of urine is a good indicator of hydration status - pale yellow indicates good hydration.",
    category: "Patient Care",
  },
  {
    id: 43,
    question: "What is the purpose of fall risk assessment tools like the Morse Fall Scale?",
    options: ["Predict likelihood of falls", "Measure balance", "Assess mobility", "Evaluate muscle strength"],
    answer: "Predict likelihood of falls",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact:
      "Falls are the most common adverse event reported in hospitals, affecting approximately 2-12% of hospitalized patients.",
    category: "Patient Care",
  },
  {
    id: 44,
    question: "Which of these is NOT typically included in the nursing process?",
    options: ["Assessment", "Diagnosis", "Implementation", "Medication"],
    answer: "Medication",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact:
      "The nursing process was first described by Lydia Hall in 1955 and has evolved into the five steps used today.",
    category: "Patient Care",
  },
  {
    id: 45,
    question: "What is the recommended hand hygiene method before performing a sterile procedure?",
    options: ["Alcohol-based hand rub", "Surgical hand scrub", "Regular handwashing", "Gloves only"],
    answer: "Surgical hand scrub",
    icon: <Droplet className="h-6 w-6 text-blue-500" />,
    funFact: "A proper surgical hand scrub should last between 2-6 minutes depending on the product used.",
    category: "Patient Care",
  },

  // Nursing Ethics
  {
    id: 46,
    question: "Which ethical principle involves treating patients fairly and equally?",
    options: ["Autonomy", "Beneficence", "Justice", "Non-maleficence"],
    answer: "Justice",
    icon: <Award className="h-6 w-6 text-yellow-500" />,
    funFact: "The principle of justice in healthcare extends to the fair distribution of scarce resources.",
    category: "Ethics",
  },
  {
    id: 47,
    question: "What does the ethical principle of 'autonomy' refer to?",
    options: ["Doing good", "Avoiding harm", "Self-determination", "Equal treatment"],
    answer: "Self-determination",
    icon: <Award className="h-6 w-6 text-yellow-500" />,
    funFact: "Respect for autonomy is the basis for informed consent in healthcare.",
    category: "Ethics",
  },
  {
    id: 48,
    question: "Which of these is NOT one of the four main principles of healthcare ethics?",
    options: ["Autonomy", "Beneficence", "Confidentiality", "Non-maleficence"],
    answer: "Confidentiality",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact:
      "While confidentiality is an important ethical concept, it's not one of the four main principles outlined by Beauchamp and Childress.",
    category: "Ethics",
  },
  {
    id: 49,
    question: "What is the purpose of a Do Not Resuscitate (DNR) order?",
    options: [
      "Prevent any medical treatment",
      "Withhold pain medication",
      "Prevent CPR if heart stops",
      "Authorize euthanasia",
    ],
    answer: "Prevent CPR if heart stops",
    icon: <Heart className="h-6 w-6 text-red-500" />,
    funFact:
      "DNR orders became formalized in the 1970s after advances in CPR and life support created ethical dilemmas.",
    category: "Ethics",
  },
  {
    id: 50,
    question: "Which of these best describes the concept of 'non-maleficence'?",
    options: ["Doing good", "Avoiding harm", "Self-determination", "Equal treatment"],
    answer: "Avoiding harm",
    icon: <Award className="h-6 w-6 text-yellow-500" />,
    funFact: "The principle of non-maleficence is reflected in the Hippocratic Oath's statement 'first, do no harm'.",
    category: "Ethics",
  },

  // Pediatric Nursing
  {
    id: 51,
    question: "What is the normal heart rate range for a 2-year-old child?",
    options: ["60-100 bpm", "80-130 bpm", "100-150 bpm", "120-160 bpm"],
    answer: "100-150 bpm",
    icon: <Heart className="h-6 w-6 text-red-500" />,
    funFact: "Children's heart rates are naturally higher than adults and gradually decrease with age.",
    category: "Pediatrics",
  },
  {
    id: 52,
    question: "Which of these childhood vaccines is typically given at birth?",
    options: ["MMR", "Hepatitis B", "DTaP", "Rotavirus"],
    answer: "Hepatitis B",
    icon: <Syringe className="h-6 w-6 text-blue-500" />,
    funFact:
      "The hepatitis B vaccine was the first vaccine that could prevent a human cancer (hepatocellular carcinoma).",
    category: "Pediatrics",
  },
  {
    id: 53,
    question: "What is the most common chronic childhood disease?",
    options: ["Diabetes", "Asthma", "Epilepsy", "Cystic fibrosis"],
    answer: "Asthma",
    icon: <Lungs className="h-6 w-6 text-blue-500" />,
    funFact: "Asthma affects approximately 6 million children in the United States alone.",
    category: "Pediatrics",
  },
  {
    id: 54,
    question: "Which developmental milestone should a 12-month-old typically achieve?",
    options: ["Running", "Walking independently", "Saying 5-10 words", "Reading simple words"],
    answer: "Walking independently",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact: "The average age for walking is around 12 months, but anywhere from 9-18 months is considered normal.",
    category: "Pediatrics",
  },
  {
    id: 55,
    question: "What is the recommended first food for infants starting solid foods?",
    options: ["Rice cereal", "Pureed fruits", "Pureed vegetables", "Yogurt"],
    answer: "Rice cereal",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact:
      "Iron-fortified rice cereal is often recommended as a first food because it's less likely to cause allergies and is easy to digest.",
    category: "Pediatrics",
  },

  // Mental Health Nursing
  {
    id: 56,
    question: "Which of these is NOT a positive symptom of schizophrenia?",
    options: ["Hallucinations", "Delusions", "Social withdrawal", "Disorganized speech"],
    answer: "Social withdrawal",
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    funFact:
      "Social withdrawal is considered a negative symptom of schizophrenia, referring to the absence of normal behaviors.",
    category: "Mental Health",
  },
  {
    id: 57,
    question: "What is the primary neurotransmitter implicated in depression?",
    options: ["Dopamine", "Serotonin", "GABA", "Acetylcholine"],
    answer: "Serotonin",
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    funFact: "Most antidepressant medications work by increasing serotonin levels in the brain.",
    category: "Mental Health",
  },
  {
    id: 58,
    question: "Which of these disorders is characterized by extreme mood swings?",
    options: [
      "Major depressive disorder",
      "Generalized anxiety disorder",
      "Bipolar disorder",
      "Obsessive-compulsive disorder",
    ],
    answer: "Bipolar disorder",
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    funFact: "Bipolar disorder affects approximately 2.8% of adults in the United States.",
    category: "Mental Health",
  },
  {
    id: 59,
    question: "What is the therapeutic approach that focuses on changing negative thought patterns?",
    options: [
      "Psychoanalysis",
      "Cognitive-behavioral therapy",
      "Electroconvulsive therapy",
      "Dialectical behavior therapy",
    ],
    answer: "Cognitive-behavioral therapy",
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    funFact:
      "CBT was developed in the 1960s by Dr. Aaron Beck and has become one of the most widely used therapeutic approaches.",
    category: "Mental Health",
  },
  {
    id: 60,
    question: "Which of these is a common side effect of antipsychotic medications?",
    options: ["Weight loss", "Increased energy", "Extrapyramidal symptoms", "Euphoria"],
    answer: "Extrapyramidal symptoms",
    icon: <Pill className="h-6 w-6 text-pink-500" />,
    funFact: "Extrapyramidal symptoms include involuntary movements, tremors, and muscle rigidity.",
    category: "Mental Health",
  },

  // Geriatric Nursing
  {
    id: 61,
    question: "Which of these is NOT a normal change associated with aging?",
    options: ["Decreased skin elasticity", "Reduced immune response", "Dementia", "Decreased bone density"],
    answer: "Dementia",
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    funFact:
      "Dementia is not a normal part of aging but a pathological process affecting approximately 5-8% of people over 65.",
    category: "Geriatrics",
  },
  {
    id: 62,
    question: "What is polypharmacy?",
    options: ["Taking multiple medications", "Pharmacy chain stores", "Medication allergies", "Drug interactions"],
    answer: "Taking multiple medications",
    icon: <Pill className="h-6 w-6 text-pink-500" />,
    funFact:
      "Polypharmacy is common in older adults, with nearly 40% of those over 65 taking five or more medications.",
    category: "Geriatrics",
  },
  {
    id: 63,
    question: "Which assessment tool is specifically designed to evaluate fall risk in older adults?",
    options: ["Glasgow Coma Scale", "Braden Scale", "Morse Fall Scale", "APGAR Score"],
    answer: "Morse Fall Scale",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact: "The Morse Fall Scale was developed by Janice Morse in 1989 and is widely used in hospitals worldwide.",
    category: "Geriatrics",
  },
  {
    id: 64,
    question: "What is the most common cause of dementia in older adults?",
    options: ["Parkinson's disease", "Alzheimer's disease", "Vascular dementia", "Lewy body dementia"],
    answer: "Alzheimer's disease",
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    funFact: "Alzheimer's disease accounts for 60-80% of dementia cases.",
    category: "Geriatrics",
  },
  {
    id: 65,
    question: "Which of these is a common sign of delirium in older adults?",
    options: [
      "Gradual onset over months",
      "Consistent symptoms throughout the day",
      "Fluctuating level of consciousness",
      "Improved attention",
    ],
    answer: "Fluctuating level of consciousness",
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    funFact:
      "Unlike dementia, delirium typically has a rapid onset and can often be reversed if the underlying cause is treated.",
    category: "Geriatrics",
  },

  // Obstetric Nursing
  {
    id: 66,
    question: "What is the normal duration of pregnancy?",
    options: ["36 weeks", "38 weeks", "40 weeks", "42 weeks"],
    answer: "40 weeks",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact:
      "Pregnancy is typically calculated as 40 weeks from the first day of the last menstrual period, not from conception.",
    category: "Obstetrics",
  },
  {
    id: 67,
    question: "Which of these is a sign of preeclampsia?",
    options: ["Low blood pressure", "Decreased urinary protein", "Edema", "Hypoglycemia"],
    answer: "Edema",
    icon: <Droplet className="h-6 w-6 text-blue-500" />,
    funFact: "Preeclampsia affects 2-8% of pregnancies worldwide and is a leading cause of maternal mortality.",
    category: "Obstetrics",
  },
  {
    id: 68,
    question: "What is the term for the first stage of labor?",
    options: ["Transition", "Dilation", "Expulsion", "Placental"],
    answer: "Dilation",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact:
      "The dilation stage is typically the longest phase of labor, lasting an average of 8 hours for first-time mothers.",
    category: "Obstetrics",
  },
  {
    id: 69,
    question: "Which position is typically recommended for delivery?",
    options: ["Supine", "Lithotomy", "Trendelenburg", "Prone"],
    answer: "Lithotomy",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact:
      "While lithotomy is common in Western medicine, many cultures use upright positions like squatting or standing for childbirth.",
    category: "Obstetrics",
  },
  {
    id: 70,
    question: "What is the purpose of Apgar scoring?",
    options: [
      "Assess maternal health",
      "Evaluate newborn condition",
      "Measure contractions",
      "Monitor fetal heart rate",
    ],
    answer: "Evaluate newborn condition",
    icon: <Clipboard className="h-6 w-6 text-amber-500" />,
    funFact:
      "The Apgar score was developed by Dr. Virginia Apgar in 1952 and is an acronym for Appearance, Pulse, Grimace, Activity, and Respiration.",
    category: "Obstetrics",
  },

  // Add more questions as needed to reach your desired total
]

// Initial set of questions to start with
export const initialQuestions = allQuestions.slice(0, 5)

// Function to get a new set of random questions
export function generateNewQuestions(currentQuestionCount: number): Question[] {
  // Reset used questions if we've gone through most of them
  if (usedQuestionIds.size > allQuestions.length * 0.7) {
    usedQuestionIds.clear()
  }

  // Get 5 random questions that haven't been used yet
  const availableQuestions = allQuestions.filter((q) => !usedQuestionIds.has(q.id))

  // If we're running low on questions, add some back to the pool
  if (availableQuestions.length < 5) {
    usedQuestionIds.clear()
    return generateNewQuestions(currentQuestionCount)
  }

  // Shuffle available questions and take 5
  const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random())
  const selectedQuestions = shuffled.slice(0, 5)

  // Mark these questions as used
  selectedQuestions.forEach((q) => usedQuestionIds.add(q.id))

  return selectedQuestions
}

// Function to reset the used questions tracking
export function resetUsedQuestions(): void {
  usedQuestionIds.clear()
}

// Icons for random question generation
export const iconOptions = [
  <Heart key="heart" className="h-6 w-6 text-red-500" />,
  <Activity key="activity" className="h-6 w-6 text-green-500" />,
  <Brain key="brain" className="h-6 w-6 text-purple-500" />,
  <Award key="award" className="h-6 w-6 text-yellow-500" />,
  <Thermometer key="thermometer" className="h-6 w-6 text-red-500" />,
  <Stethoscope key="stethoscope" className="h-6 w-6 text-gray-500" />,
  <Pill key="pill" className="h-6 w-6 text-pink-500" />,
  <Syringe key="syringe" className="h-6 w-6 text-blue-500" />,
  <Clipboard key="clipboard" className="h-6 w-6 text-amber-500" />,
  <Microscope key="microscope" className="h-6 w-6 text-purple-500" />,
  <Lungs key="lungs" className="h-6 w-6 text-blue-500" />,
  <Droplet key="droplet" className="h-6 w-6 text-blue-500" />,
  <Virus key="virus" className="h-6 w-6 text-green-500" />,
  <Bacteria key="bacteria" className="h-6 w-6 text-green-500" />,
  <FirstAid key="firstaid" className="h-6 w-6 text-red-500" />,
  <Bandage key="bandage" className="h-6 w-6 text-amber-500" />,
  <Bone key="bone" className="h-6 w-6 text-gray-500" />,
  <Eye key="eye" className="h-6 w-6 text-blue-500" />,
  <Ear key="ear" className="h-6 w-6 text-pink-500" />,
  <Dna key="dna" className="h-6 w-6 text-purple-500" />,
]

