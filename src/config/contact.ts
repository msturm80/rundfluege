export const CONTACT = {
  pilotName: "Hans Weiss",
  pilotEmail: "weiss-hans@t-online.de",
  pilotPhone: "+49 170 2220444",
  pilotPhoneTel: "+491702220444",
  inquiryEmail: "test@sturms.org",
  whatsappNumber: "+4901624271539",
  whatsappDigits: "4901624271539",
  address: {
    line1: "Am Flughafen",
    line2: "Gewerbegebiet Nordost 3",
    line3: "88046 Friedrichshafen",
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
