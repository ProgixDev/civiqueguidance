import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BrushUnderline from "@/app/components/BrushUnderline";

const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDAwMDUzIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDAwMDkxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+";

export const metadata = {
  title: "Nos Services | Démarches Civique",
  description:
    "L'ensemble de nos prestations d'accompagnement administratif. Nous vous aidons à constituer des dossiers solides et conformes.",
};

type ServiceListItem = {
  slug: string | null;
  icon: string;
  title: string;
  desc: string;
  prix: string;
  bgImage: string;
};

const allServices: ServiceListItem[] = [
  {
    slug: "demandeurs-asile",
    icon: "gavel",
    title: "Demandeurs d'asile",
    desc: "Accompagnement pour votre demande d'asile en France. Aide à la constitution du dossier OFPRA, préparation à l'entretien, et suivi de votre procédure.",
    prix: "600 €",
    bgImage:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "etudiants",
    icon: "school",
    title: "Étudiants (France)",
    desc: "Accompagnement complet pour vos études en France. Inscription, visa étudiant, titre de séjour, et démarches administratives.",
    prix: "250 €",
    bgImage:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "titre-de-sejour",
    icon: "badge",
    title: "Titre de séjour",
    desc: "Aide pour votre première demande ou renouvellement de titre de séjour. Constitution du dossier, vérification des documents, et suivi de votre demande.",
    prix: "250 €",
    bgImage: "/titre-de-sejour.png",
  },
  {
    slug: "naturalisation",
    icon: "flag",
    title: "Naturalisation",
    desc: "Accompagnement pour votre demande de naturalisation française. Préparation du dossier, vérification des conditions, et suivi de la procédure.",
    prix: "250 €",
    bgImage: "/naturalisation.png",
  },
  {
    slug: "regroupement-familial",
    icon: "diversity_3",
    title: "Regroupement familial",
    desc: "Aide pour faire venir votre famille en France. Constitution du dossier OFII, vérification des conditions de ressources et de logement.",
    prix: "300 €",
    bgImage:
      "/regroupement.png",
  },
  {
    slug: "regularisation",
    icon: "balance",
    title: "Régularisation administrative",
    desc: "Accompagnement pour régulariser votre situation administrative en France. Analyse de votre situation et constitution du dossier adapté.",
    prix: "600 €",
    bgImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "logement",
    icon: "home",
    title: "Aide au logement",
    desc: "Accompagnement pour trouver un logement en France. Constitution du dossier de location, démarches CAF (APL), et accès au logement social (DALO, SYPLO).",
    prix: "250 €",
    bgImage: "/logement.png",
  },
  {
    slug: "cv",
    icon: "description",
    title: "CV & Lettre de motivation",
    desc: "Aide à la rédaction de votre CV et lettre de motivation adaptés au marché français. Mise en valeur de votre parcours et de vos compétences.",
    prix: "45 €",
    bgImage:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "dcem",
    icon: "child_care",
    title: "DCEM (enfants mineurs)",
    desc: "Demande de Document de Circulation pour Étranger Mineur. Permet à votre enfant mineur de voyager hors de France et d'y revenir sans visa.",
    prix: "Sur devis",
    bgImage:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "taj",
    icon: "folder_delete",
    title: "Effacement de TAJ",
    desc: "Demande d'effacement ou de rectification de vos données dans le fichier des antécédents judiciaires (TAJ), pour débloquer vos démarches.",
    prix: "Sur devis",
    bgImage:
      "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=600&q=80",
  },
];

export default function ServicesIndexPage() {
  return (
    <>
      <Navbar />
      <main className="py-12 sm:py-20">
        <div className="max-w-content mx-auto px-page">
          {/* Fil d'Ariane */}
          <nav className="text-[13px] mb-8 text-on-surface-variant">
            <Link href="/" className="hover:text-french-blue transition-colors">
              Accueil
            </Link>
            <span className="mx-2 opacity-50">/</span>
            <span className="text-ink-black font-semibold">Services</span>
          </nav>

          {/* Header */}
          <header className="mb-12 sm:mb-16 max-w-3xl">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-french-blue bg-french-blue/5 px-3 py-1 rounded-full border border-french-blue/10 mb-4">
              Prestations
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-ink-black mb-4">
              <span className="relative inline-block">
                Nos Services
                <BrushUnderline />
              </span>
            </h1>
            <p className="text-[16px] sm:text-[18px] leading-relaxed text-on-surface-variant mt-6">
              Découvrez l&apos;ensemble de nos prestations d&apos;accompagnement
              administratif. Nous vous aidons à constituer des dossiers solides
              et conformes.
            </p>
          </header>

          {/* Grille : même style que Champs d'Intervention (photos + dégradé sombre) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((s, index) => {
              const href = s.slug
                ? `/services/${s.slug}`
                : `/demande?service=cv`;
              return (
                <Link
                  key={s.title}
                  href={href}
                  className="relative bg-ink-black border border-ink-black/8 transition-all duration-500 group cursor-pointer rounded-2xl p-8 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 min-h-90"
                >
                  {/* Image de fond — next/image avec placeholder flouté */}
                  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl bg-french-blue/20">
                    <Image
                      src={s.bgImage}
                      alt={s.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                      quality={85}
                      priority={index < 3}
                      className="object-cover opacity-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-ink-black/90 via-ink-black/40 to-transparent" />
                  </div>

                  {/* Badge tarif */}
                  <span className="absolute top-5 right-5 z-20 inline-flex items-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3 py-1 text-[12px] font-extrabold tracking-tight text-white shadow-sm">
                    {s.prix}
                  </span>

                  {/* Contenu au premier plan */}
                  <div className="relative z-10 flex flex-col h-full justify-between grow">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-10 transition-all duration-500 group-hover:bg-white group-hover:border-transparent group-hover:scale-105">
                        <span
                          className="material-symbols-outlined text-white group-hover:text-french-blue transition-colors duration-300"
                          style={{
                            fontSize: "20px",
                            fontVariationSettings: "'wght' 300, 'opsz' 24",
                          }}
                        >
                          {s.icon}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-white tracking-tight mb-3">
                        {s.title}
                      </h2>

                      <p className="text-[13.5px] leading-relaxed text-white/80 group-hover:text-white transition-colors duration-300">
                        {s.desc}
                      </p>
                    </div>

                    <div className="mt-10 flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center text-white/80 group-hover:text-white text-[11px] font-extrabold tracking-widest uppercase gap-1 transition-colors">
                        <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white group-hover:after:w-full after:transition-all after:duration-300">
                          Découvrir
                        </span>
                        <span
                          className="material-symbols-outlined text-[14px] transition-transform duration-300 group-hover:translate-x-1"
                          style={{ fontVariationSettings: "'wght' 300" }}
                        >
                          arrow_right_alt
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-white/30 group-hover:text-white/60 transition-colors">
                        [ 0{index + 1} ]
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA bas de page */}
          <section className="mt-16 bg-linear-to-br from-french-blue to-[#000053] text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-marianne-red/20 blur-3xl rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none" />
            <div className="relative">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
                Vous ne trouvez pas votre besoin ?
              </h2>
              <p className="text-[15px] text-white/80">
                Décrivez votre situation et nous vous proposerons un
                accompagnement adapté.
              </p>
            </div>
            <Link
              href="/demande"
              className="relative inline-flex items-center justify-center bg-white text-french-blue hover:bg-white/90 px-7 py-4 rounded-xl text-[14px] font-bold tracking-wide shadow-md transition-all whitespace-nowrap"
            >
              Demander un service
              <span
                className="material-symbols-outlined text-[16px] ml-2"
                style={{ fontVariationSettings: "'wght' 300" }}
              >
                arrow_right_alt
              </span>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
