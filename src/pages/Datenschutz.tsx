import { Link } from "react-router-dom";
import LegalLayout from "../components/layout/LegalLayout";
import { CONTACT } from "../config/contact";

function Datenschutz() {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
      </p>
      <p>
        {CONTACT.pilotName}
        <br />
        {CONTACT.legalAddress.line1}
        <br />
        {CONTACT.legalAddress.line2}
        <br />
        {CONTACT.legalAddress.line3}
        <br />
        E-Mail:{" "}
        <a href={`mailto:${CONTACT.pilotEmail}`}>{CONTACT.pilotEmail}</a>
      </p>

      <h2>2. Allgemeine Hinweise</h2>
      <p>
        Der Schutz personenbezogener Daten ist uns wichtig. Personenbezogene
        Daten werden auf dieser Website nur verarbeitet, soweit dies zur
        Bereitstellung der Website, zur Bearbeitung von Anfragen oder aufgrund
        einer Einwilligung erforderlich ist.
      </p>

      <h2>3. Hosting über Vercel</h2>
      <p>
        Diese Website wird über Vercel gehostet. Anbieter ist Vercel Inc., 440
        N Barranca Ave #4133, Covina, CA 91723, USA.
      </p>
      <p>
        Beim Besuch der Website können durch Vercel technische Zugriffsdaten
        verarbeitet werden, insbesondere IP-Adresse, Datum und Uhrzeit des
        Zugriffs, Browsertyp, Betriebssystem, Referrer-URL und angeforderte
        Dateien. Die Verarbeitung erfolgt zur technischen Bereitstellung,
        Stabilität und Sicherheit der Website.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte
        Interesse liegt im sicheren und zuverlässigen Betrieb dieser Website.
      </p>
      <p>
        Vercel stellt Informationen zum Datenschutz und zur Datenverarbeitung
        bereit, einschließlich Data Processing Addendum und Privacy Policy.
        Vercel beschreibt dort auch internationale Datenübermittlungen und
        Schutzmechanismen.
      </p>

      <h2>4. Kontaktformular</h2>
      <p>
        Wenn Besucher über das Kontaktformular eine Anfrage senden, werden die
        eingegebenen Daten verarbeitet. Dies können insbesondere Name,
        E-Mail-Adresse, Nachricht sowie freiwillig angegebene weitere
        Kontaktdaten sein.
      </p>
      <p>
        Die Daten werden ausschließlich zur Bearbeitung der Anfrage verwendet.
        Eine Weitergabe an Dritte erfolgt nicht ohne Einwilligung, soweit keine
        gesetzliche Pflicht besteht.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf
        eine mögliche Durchführung eines Rundflugs gerichtet ist, sowie Art. 6
        Abs. 1 lit. f DSGVO für sonstige Anfragen.
      </p>
      <p>
        Die Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet
        wurde und keine gesetzlichen Aufbewahrungspflichten bestehen.
      </p>

      <h2>5. Google Maps</h2>
      <p>
        Diese Website verwendet Google Maps, um Karteninhalte darzustellen.
        Anbieter ist Google Ireland Limited, Gordon House, Barrow Street,
        Dublin 4, Irland.
      </p>
      <p>
        Google Maps wird auf dieser Website erst geladen, nachdem der Besucher
        ausdrücklich eingewilligt hat. Vorher findet keine Verbindung zu Google
        Maps statt.
      </p>
      <p>
        Nach Einwilligung können personenbezogene Daten, insbesondere
        IP-Adresse und Nutzungsinformationen, an Google übertragen werden.
        Dabei kann auch eine Übermittlung in die USA erfolgen.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO. Die Einwilligung kann
        jederzeit über die <Link to="/cookies">Cookie-Einstellungen</Link>{" "}
        widerrufen werden.
      </p>

      <h2>6. Google Analytics</h2>
      <p>
        Diese Website nutzt Google Analytics 4, einen Webanalysedienst der
        Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
      </p>
      <p>
        Google Analytics setzt Cookies und ähnliche Technologien ein, um
        Informationen über die Nutzung der Website zu sammeln. Diese
        Informationen werden an Server von Google übertragen und dort
        gespeichert. Eine Übermittlung in die USA ist möglich.
      </p>
      <p>
        Google Analytics wird auf dieser Website ausschließlich nach
        ausdrücklicher Einwilligung des Besuchers geladen. Vor der
        Einwilligung findet keine Verbindung zu Google Analytics statt. Die
        IP-Adresse wird durch die Funktion <em>anonymize_ip</em> gekürzt
        verarbeitet.
      </p>
      <p>
        Erfasst werden insbesondere: gekürzte IP-Adresse, Geräte- und
        Browser-Informationen, Verweildauer, besuchte Seiten und
        Interaktionen.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO. Die Einwilligung kann
        jederzeit über die <Link to="/cookies">Cookie-Einstellungen</Link>{" "}
        widerrufen werden. Die verwendete Mess-ID lautet G-KKJGPNL47Z.
      </p>

      <h2>7. Cookies und lokale Speicherung</h2>
      <p>
        Diese Website verwendet technisch notwendige Cookies oder lokale
        Speichermechanismen, soweit sie für den Betrieb der Website erforderlich
        sind.
      </p>
      <p>
        Nicht notwendige Dienste, insbesondere Google Maps und Google
        Analytics, werden nur nach Einwilligung geladen. Die Auswahl des
        Besuchers wird lokal gespeichert, damit die Entscheidung beim nächsten
        Besuch berücksichtigt werden kann.
      </p>

      <h2>8. Rechte der betroffenen Personen</h2>
      <p>Besucher haben nach Maßgabe der DSGVO folgende Rechte:</p>
      <ul>
        <li>Recht auf Auskunft</li>
        <li>Recht auf Berichtigung</li>
        <li>Recht auf Löschung</li>
        <li>Recht auf Einschränkung der Verarbeitung</li>
        <li>Recht auf Datenübertragbarkeit</li>
        <li>Recht auf Widerspruch gegen bestimmte Verarbeitungen</li>
        <li>Recht auf Widerruf einer erteilten Einwilligung</li>
      </ul>
      <p>
        Zur Ausübung dieser Rechte genügt eine E-Mail an:{" "}
        <a href={`mailto:${CONTACT.pilotEmail}`}>{CONTACT.pilotEmail}</a>
      </p>

      <h2>9. Beschwerderecht</h2>
      <p>
        Betroffene Personen haben das Recht, sich bei einer
        Datenschutzaufsichtsbehörde zu beschweren.
      </p>
      <p>
        Zuständig kann insbesondere der Landesbeauftragte für den Datenschutz
        und die Informationsfreiheit Baden-Württemberg sein.
      </p>

      <h2>10. Stand</h2>
      <p>Stand: Mai 2026</p>
    </LegalLayout>
  );
}

export default Datenschutz;
