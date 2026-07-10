import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <span className="footer-logo">AirSteam</span>
            <p>Professionel bilvask og bilpleje i Grindsted. Shine &amp; Clean.</p>
          </div>
          <div>
            <h4>Sider</h4>
            <ul>
              <li><Link href="/">Forside</Link></li>
              <li><Link href="/ydelser">Ydelser &amp; priser</Link></li>
              <li><Link href="/kontakt">Kontakt</Link></li>
              <li><Link href="/book">Book en tid</Link></li>
            </ul>
          </div>
          <div>
            <h4>Kontakt</h4>
            <ul>
              <li><a href="tel:+4528732928">28 73 29 28</a></li>
              <li><a href="mailto:Airsteam.dk@hotmail.com">Airsteam.dk@hotmail.com</a></li>
              <li>Jernbanegade 17, 7200 Grindsted</li>
            </ul>
          </div>
          <div>
            <h4>Åbningstider</h4>
            <ul>
              <li>Man–Fre: 09–17</li>
              <li>Lør: 10–14</li>
              <li>Søn: Lukket</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} AirSteam. Alle rettigheder forbeholdes.</span>
          <span>Demo-hjemmeside</span>
        </div>
      </div>
    </footer>
  );
}
