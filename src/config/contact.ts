export const CONTACT = {
  pilotName: "Hans Weiss",
  pilotEmail: "weiss-hans@t-online.de",
  inquiryEmail: "test@sturms.org",
  whatsappNumber: "+491702220444",
  whatsappDigits: "491702220444",
  // Treffpunkt am Flughafen Friedrichshafen (Meeting point)
  meetingAddress: {
    line1: "Am Flughafen",
    line2: "Gewerbegebiet Nordost 3",
    line3: "88046 Friedrichshafen",
  },
  // Anschrift gem. § 5 DDG (Impressum)
  legalAddress: {
    line1: "Wasenweg 5",
    line2: "88074 Meckenbeuren",
    line3: "Deutschland",
  },
  aircraft: "Cessna D-EIZY",
  priceBase: 300,
  priceExtraPerson: 30,
  durationMinutes: 60,
} as const;

export const buildWhatsappUrl = (text: string) => {
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${CONTACT.whatsappDigits}?text=${encoded}`;
};

export const buildMailtoUrl = (subject: string, body: string, to = CONTACT.inquiryEmail) => {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
