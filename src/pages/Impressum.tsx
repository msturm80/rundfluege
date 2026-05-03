import LegalLayout from "../components/layout/LegalLayout";
import { CONTACT } from "../config/contact";

function Impressum() {
  return (
    <LegalLayout title="Impressum">
      <p className="font-semibold">Angaben gemäß § 5 DDG</p>

      <p>
        {CONTACT.pilotName}
        <br />
        {CONTACT.legalAddress.line1}
        <br />
        {CONTACT.legalAddress.line2}
        <br />
        {CONTACT.legalAddress.line3}
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail:{" "}
        <a href={`mailto:${CONTACT.pilotEmail}`}>{CONTACT.pilotEmail}</a>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {CONTACT.pilotName}
        <br />
        {CONTACT.legalAddress.line1}
        <br />
        {CONTACT.legalAddress.line2}
      </p>

      <h2>Hinweis zu den angebotenen Rundflügen</h2>
      <p>
        Die auf dieser Website dargestellten Rundflüge sind private
        Mitfluggelegenheiten zum Selbstkostenpreis. Es handelt sich nicht um
        gewerbliche Beförderungsleistungen. Die Durchführung erfolgt
        vorbehaltlich Verfügbarkeit, Wetter, luftrechtlicher Vorgaben und der
        Entscheidung des verantwortlichen Piloten.
      </p>
    </LegalLayout>
  );
}

export default Impressum;
