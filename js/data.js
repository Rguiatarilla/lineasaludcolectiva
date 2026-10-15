/**
 * data.js — Datos de la línea de tiempo de Salud Colectiva
 * scData:  4 etapas de Salud Colectiva con 24 hitos en total (vista por etapas)
 */

/* ══════════════════════════════════════════════════════
   SALUD COLECTIVA (SC) — 4 etapas, cada una en su tarjeta
   con su rango de años y sus hitos.
   ══════════════════════════════════════════════════════ */
const scData = [
    {
        etapa: 1,
        year: "1918 – 1959",
        title: "Antecedentes y primeras experiencias",
        subtitle: "De la atención rural a la medicina social",
        intro: "Las campañas sanitarias, los seminarios internacionales y las primeras experiencias comunitarias en Antioquia abrieron el camino hacia una mirada más amplia y social de la salud.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
        hitos: [
            {
                year: "1918 – 1959",
                title: "Campañas Sanitarias contra el Pian en Antioquia",
                variant: "teal",
                icon: "assets/images/campañas-sanitarias.png",
                description: "Las campañas contra el pian en Antioquia llevaron por primera vez de manera sistemática la atención médica desde las ciudades hacia las zonas rurales y marginadas, mediante unidades sanitarias descentralizadas, comisiones de higiene rural y médicos itinerantes. Mostraron que la salud debía atender las condiciones de vida y las necesidades comunitarias, no solo la enfermedad individual.",
                link: "https://revistas.unal.edu.co/index.php/achsc/article/view/97207"
            },
            {
                year: "1955 – 1956",
                title: "Seminarios Internacionales (Viña del Mar / Tehuacán)",
                variant: "green",
                icon: "assets/images/Seminarios.png",
                description: "Promovieron en América Latina una visión integral de la salud que incluía la prevención, la comunidad y las condiciones del entorno, sentando antecedentes para la Atención Primaria en Salud.",
                link: "https://www.scielo.br/j/sausoc/a/bTHWsnDCM3h9Fpj73YGSLgn/?lang=pt"
            },
            {
                year: "1956",
                title: "Depto. Medicina Preventiva y Salud Pública (U. de Antioquia)",
                variant: "orange",
                icon: "assets/images/Salud-publica-territorio.png",
                footer: "Héctor Abad Gómez",
                description: "Impulsado por Héctor Abad Gómez, fortaleció el enfoque preventivo y comunitario en Colombia para acercar la formación médica a las comunidades y sus problemas sociales.",
                link: "https://gacetasanitaria.org/es-hector-abad-gomez-1921-1987-medico-educador-articulo-S0213911120300662"
            },
            {
                year: "1958",
                title: "Programa de Promotoras Rurales de Salud (Santo Domingo)",
                variant: "green",
                icon: "assets/images/promotoras-rurales.png",
                description: "Fortaleció la participación comunitaria capacitando a promotoras en higiene, saneamiento, primeros auxilios y vacunación, reduciendo la dependencia de especialistas.",
                link: "https://gacetasanitaria.org/es-hector-abad-gomez-1921-1987-medico-educador-articulo-S0213911120300662"
            },
            {
                year: "1963",
                title: "Escuela Nacional de Salud Pública (Medellín)",
                variant: "teal",
                icon: "assets/images/Escuela-nacional-salud-publica.png",
                description: "Fundada por Héctor Abad Gómez para profundizar en la medicina social y consolidar en Colombia una mirada académica más allá de la enfermedad individual.",
                link: "https://www.gacetasanitaria.org/es-hector-abad-gomez-1921-1987-medico-educador-articulo-resumen-S0213911120300662"
            }
        ]
    },
    {
        etapa: 2,
        year: "1960 – 1975",
        title: "Desarrollo teórico y conceptual",
        subtitle: "Determinación social y crítica al modelo preventivo",
        intro: "Los aportes de Jaime Breilh, los seminarios de ciencias sociales en salud y la crítica de Sergio Arouca cuestionaron la mirada biológica e individual, abriendo paso a comprender la salud como un proceso social e histórico.",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
        hitos: [
            {
                year: "1960 – 1975",
                title: "Jaime Breilh y la Determinación Social de la Salud",
                variant: "green",
                icon: "assets/images/Salud-colectiva-ciudadbienestar.png",
                description: "Principal referente de la Medicina Social Latinoamericana. Contribuyó a posicionar la Determinación Social de la Salud para entender el proceso salud-enfermedad como resultado de factores históricos, socioeconómicos, políticos, culturales y ambientales.",
                link: "https://www.comunidadandina.org/"
            },
            {
                year: "1972",
                title: "Seminario de Ciencias Sociales Aplicadas a la Medicina (Cuenca)",
                variant: "orange",
                icon: "assets/images/Seminarios-ciencias-sociales.png",
                description: "Impulsado por Juan César García, reunió a investigadores latinoamericanos para analizar la relación entre sociedad, salud y enfermedad, cuestionando la perspectiva puramente biológica.",
                link: "https://www.scielo.br/j/csc/a/JwYtGBwxKGFSGp6Jv6rbSQM/?lang=pt"
            },
            {
                year: "1975",
                title: "Tesis 'O Dilema Preventivista' (Sergio Arouca)",
                variant: "orange",
                icon: "assets/images/escuela-salud-publica.png",
                description: "Sergio Arouca cuestionó los límites de la medicina preventiva por su enfoque liberal e individual, abriendo paso hacia la Medicina Social Latinoamericana y la Salud Colectiva.",
                link: "https://books.scielo.org/id/q7gtd"
            }
        ]
    },
    {
        etapa: 3,
        year: "1976 – 1988",
        title: "Institucionalización y movimientos sociales",
        subtitle: "Del CEBES al SUS: la salud como derecho colectivo",
        intro: "La fundación del CEBES, ABRASCO y ALAMES consolidó la Salud Colectiva como campo académico y movimiento latinoamericano, hasta llegar al reconocimiento de la salud como derecho con la Constitución de Brasil y la creación del SUS en 1988.",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
        hitos: [
            {
                year: "1976",
                title: "Fundación del CEBES (Brasil)",
                variant: "teal",
                icon: "assets/images/brasil.png",
                description: "El Centro Brasileño de Estudios de Salud promovió la salud como un fenómeno social y político, impulsando el movimiento de Reforma Sanitaria Brasileña y el origen del SUS.",
                link: "https://cebes.org.br/ano-1976/5830/"
            },
            {
                year: "1978",
                title: "1.er Encuentro Nacional de Posgrados (Bahía)",
                variant: "green",
                icon: "assets/images/Salud-publica-territorio.png",
                description: "Espacio donde se comenzó a consolidar la Salud Colectiva como campo interdisciplinario (articulando epidemiología, ciencias sociales y políticas públicas), antecedente directo de ABRASCO.",
                link: "https://abrasco.org.br/passado-presente-e-futuro-da-saude-coletiva-em-sessao-alusiva-aos-35-anos-da-abrasco-em-salvador/"
            },
            {
                year: "1979",
                title: "Fundación de ABRASCO (Brasil)",
                variant: "orange",
                icon: "assets/images/brasil.png",
                description: "El 27 de septiembre de 1979 se creó la Asociación Brasileña de Posgrado en Salud Colectiva, institucionalizando el campo académico en América Latina.",
                link: "https://abrasco.org.br/sobre-a-abrasco/historia-e-memoria/"
            },
            {
                year: "1984",
                title: "Fundación de ALAMES (Ouro Preto)",
                variant: "teal",
                icon: "assets/images/Salud-colectiva-ciudadbienestar.png",
                description: "Creación de la Asociación Latinoamericana de Medicina Social para unificar conocimientos y luchas en torno a la salud entendida como derecho colectivo y social.",
                link: "https://alames.org/"
            },
            {
                year: "1987",
                title: "Asesinato de Héctor Abad Gómez",
                variant: "teal",
                icon: "assets/images/Muerte-abad-gomez.png",
                description: "Asesinado el 25 de agosto de 1987 en Medellín, su legado reafirmó una medicina social comprometida con los derechos humanos, la justicia social y el bienestar de las comunidades.",
                link: "https://centrodememoriahistorica.gov.co/no-olvidamos-a-hector-abad-gomez/"
            },
            {
                year: "1988",
                title: "Constitución de Brasil y creación del SUS",
                variant: "green",
                icon: "assets/images/brasil.png",
                description: "Reconoció la salud como derecho de todos y deber del Estado, institucionalizando el Sistema Único de Salud (SUS) con acceso universal e integral.",
                link: "https://www.scielo.br/j/sausoc/a/QKtFb9PkdpcTnz7YNJyMzjN/?lang=pt"
            }
        ]
    },
    {
        etapa: 4,
        year: "1993 – presente",
        title: "Consolidación, territorialización y debates contemporáneos",
        subtitle: "La Salud Colectiva como campo propio y acción territorial",
        intro: "La Salud Colectiva se consolida como campo científico, se territorializa en políticas locales como Ciudad Bienestar en Pasto y el Plan Decenal, y sostiene debates contemporáneos sobre determinación social, democracia y derecho a la salud.",
        image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80",
        hitos: [
            {
                year: "1993",
                title: "Área de Evaluación CAPES en Saúde Coletiva",
                variant: "orange",
                icon: "assets/images/Seminarios-ciencias-sociales.png",
                description: "Creación del área formal por la CAPES, consolidando la Salud Colectiva como campo de conocimiento e investigación propio.",
                link: "https://abrasco.org.br/sobre-a-abrasco/historia-e-memoria/"
            },
            {
                year: "1998",
                title: "Artículo sobre Salud Colectiva (Paim y Almeida Filho)",
                variant: "teal",
                icon: "assets/images/Salud-colectiva-ciudadbienestar.png",
                description: "Propuso la Salud Colectiva no como una simple reformulación de la salud pública tradicional, sino como un campo científico abierto a nuevos paradigmas.",
                link: "https://www.scielo.br/j/rsp/"
            },
            {
                year: "2003 – 2004",
                title: "Doctorado en Salud Pública (U. Nacional de Colombia)",
                variant: "orange",
                icon: "assets/images/escuela-salud-publica.png",
                description: "Primer doctorado del área en Colombia, orientado a investigar determinantes sociales de la salud e integrar dimensiones biológicas, sociales y políticas.",
                link: "https://saludpublica.unal.edu.co/"
            },
            {
                year: "2007",
                title: "Modelo de Salud Mental Comunitaria (Ordenanza 026 Nariño)",
                variant: "green",
                icon: "assets/images/modelo-salud-mental.png",
                description: "Llevó la salud mental de los hospitales a las comunidades, formando cerca de 4.000 agentes comunitarios en el 100 % de los municipios de Nariño.",
                link: "https://www.minsalud.gov.co/"
            },
            {
                year: "2019",
                title: "Política de Salud en Todos los Derechos y Ciudad Bienestar (Pasto)",
                variant: "teal",
                icon: "assets/images/Salud-publica-territorio.png",
                description: "Política municipal de Salud Colectiva (Acuerdo 034 de 2019) vigente hasta 2032 que opera mediante la estrategia Ciudad Bienestar y Mesas Territoriales.",
                link: ""
            },
            {
                year: "2022 – 2031",
                title: "Salud Colectiva y Acción Territorial (Plan Decenal)",
                variant: "green",
                icon: "assets/images/Salud-colectiva-ciudadbienestar.png",
                description: "Marco público colombiano que fortalece el derecho a la salud mediante siete ejes estratégicos orientados a determinantes sociales y Atención Primaria.",
                link: "https://www.minsalud.gov.co/"
            },
            {
                year: "2025",
                title: "XVIII Congreso ALAMES (Río de Janeiro)",
                variant: "orange",
                icon: "assets/images/Seminarios.png",
                description: "Encuentro con más de 2.500 participantes para conmemorar 40 años de ALAMES, centrado en la determinación social de la salud, la democracia y la soberanía de los pueblos.",
                link: "https://alames.org/"
            }
        ]
    }
];
