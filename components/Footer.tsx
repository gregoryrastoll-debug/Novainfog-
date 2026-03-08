// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white py-16 px-6 text-gray-800 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        {/* Bloc Mentions légales – centré */}
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6 text-sky-700">
            Mentions légales
          </h3>

          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Éditeur :</strong> NovaInfogé<br />
            <strong>SIRET :</strong> 100 796 622 00015<br />
            <strong>Contact :</strong> gregory.rastoll@novainfoge.com | 06 17 85 64 20
          </p>

          <p className="text-gray-700 leading-relaxed text-sm">
            Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, 
            les coordonnées de l’hébergeur sont : [Nom hébergeur, adresse, etc.].  
            Le site est hébergé par Vercel.
          </p>
        </div>

        {/* Copyright – déjà centré */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Novainfogé. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}