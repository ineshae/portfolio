import { useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { Navbar } from "./components/Navbar";
import { PortfolioCard } from "./components/PortfolioCard";
import { HeroDisplay } from "./components/HeroDisplay";
import { ProjectModal } from "./components/ProjectModal";

// Import our custom slide deck uploaded by the user
import slideOne from "./assets/images/팀_새싹🌱-01.png";
import slideTwo from "./assets/images/2.png";
import slideThree from "./assets/images/팀_새싹🌱-03.png";
import slideFour from "./assets/images/팀_새싹🌱-04.png";
import slideFive from "./assets/images/팀_새싹🌱-05.png";
import slideSix from "./assets/images/팀_새싹🌱-06.png";
import slideSeven from "./assets/images/팀_새싹🌱-07.png";
import slideEight from "./assets/images/팀_새싹🌱-08.png";
import slideNine from "./assets/images/팀_새싹🌱-09.png";
import slideTen from "./assets/images/팀_새싹🌱-10.png";
import hultExtra from "./assets/images/IMG_7291.JPG";

// Import Vision for the Future uploaded assets
import visionOne from "./assets/images/logo copy.png";
import visionTwo from "./assets/images/poster02 copy.jpg";
import visionThree from "./assets/images/poster01 copy.jpg";
import visionFour from "./assets/images/poster04 copy.jpg";
import visionFive from "./assets/images/poster03.jpg";

// Import Business Report uploaded assets
import reportOne from "./assets/images/Screenshot 2026-06-07 at 5.29.47 AM.png";
import reportTwo from "./assets/images/Screenshot 2026-06-07 at 5.29.58 AM.png";
import reportThree from "./assets/images/Screenshot 2026-06-07 at 5.30.09 AM.png";
import reportFour from "./assets/images/Screenshot 2026-06-07 at 5.30.17 AM.png";

// Import Voluntas uploaded assets
import voluntasOne from "./assets/images/IMG_7287.JPG";
import voluntasTwo from "./assets/images/IMG_7288.JPG";
import voluntasThree from "./assets/images/IMG_7289.JPG";
import voluntasFour from "./assets/images/1780779055.557627.JPEG";
import voluntasFive from "./assets/images/IMG_7284.PNG";
import voluntasSix from "./assets/images/IMG_7286.jpg";

// Import Smart Tech Smart Life uploaded assets
import smartOne from "./assets/images/공공데이터 활용 ppt_page-0001.jpg";
import smartTwo from "./assets/images/공공데이터 활용 ppt_page-0002.jpg";
import smartThree from "./assets/images/공공데이터 활용 ppt_page-0003.jpg";
import smartFour from "./assets/images/공공데이터 활용 ppt_page-0004.jpg";
import smartFive from "./assets/images/공공데이터 활용 ppt_page-0005.jpg";
import smartSix from "./assets/images/공공데이터 활용 ppt_page-0006.jpg";
import smartSeven from "./assets/images/공공데이터 활용 ppt_page-0007.jpg";
import smartEight from "./assets/images/공공데이터 활용 ppt_page-0008.jpg";
import smartNine from "./assets/images/공공데이터 활용 ppt_page-0009.jpg";
import smartAward from "./assets/images/Screenshot 2026-06-07 at 7.05.29 AM.png";

const PROJECTS = [
  {
    title: "K-POP 앨범 폐CD 업사이클링 프로젝트 기획",
    category: "Upcycling Project",
    cardDescription: "헐트프라이즈라는 대회에서 '팀 새싹'으로 참여했습니다.",
    description: "헐트프라이즈라는 대회에서 '팀 새싹'으로 참여했습니다. Researcher Analyst 로 참여해 버려지는 CD에 새로운 가치를 더해 CD의 사용주기를 연장하고 환경문제를 해결하는 프로젝트기획에 참여해 준우승이라는 결과를 얻었습니다.",
    gradient: "bg-purple-600/40",
    slides: [
      slideOne,   // Slide 1
      slideTwo,   // Slide 2
      slideThree, // Slide 3
      slideFour,  // Slide 4
      slideFive,  // Slide 5
      slideSix,   // Slide 6
      slideSeven, // Slide 7
      slideEight, // Slide 8
      slideNine,  // Slide 9
      slideTen,   // Slide 10
      hultExtra   // 준우승 추가 이미지 (IMG_7291)
    ],
    hideConceptLabel: true,
    description2: "",
    deliverables: ["Hult Prize", "Research Analyst", "CD Upcycling", "Eco-design Strategy"],
  },
  {
    title: "Photoshop",
    category: "Design",
    cardDescription: "포토샵 작업물 입니다.",
    description: "TIMBER 샵 이라는 스케이트 보드 가게의 로고 리디자인과 포스터를 제작했습니다.",
    gradient: "bg-emerald-500/40",
    slides: [
      visionOne,   // logo copy.png
      visionTwo,   // poster02 copy.jpg
      visionThree, // poster01 copy.jpg
      visionFour,  // poster04 copy.jpg
      visionFive   // poster03.jpg
    ],
    hideConceptLabel: true,
    description2: "",
    deliverables: ["Logo Design", "Poster Illustration", "Brand Identity", "Adobe Photoshop"]
  },
  {
    title: "Video production skills",
    category: "Video Production",
    cardDescription: "영상 작업물입니다.",
    description: "다빈치 리졸브와 AI 영상툴인 VEO 그리고 Kling 을 이용해 영상과 노래를 제작하였습니다.",
    gradient: "bg-blue-600/40",
    slides: [
      "https://youtu.be/M0BkEuHXEdA?si=qmeFK6YPJGpFb46j",
      "https://youtu.be/VmO0-1_QWOU?si=za10rfDhsgbq9F45",
      "https://youtu.be/OsqM8RudMcY?si=QvWOd1ifOGW9uicH"
    ],
    hideConceptLabel: true,
    description2: "",
    deliverables: ["DaVinci Resolve", "Google VEO", "Kling AI", "Video Editing", "AI Generation"]
  },
  {
    title: "AI 서비스 기획 산학연구",
    category: "AI Research",
    cardDescription: "산학협력으로 진행한 AI 서비스 기획 프로젝트입니다.",
    description: `전공 교수님의 ‘AI 서비스 기획 산학연구’에 보조연구원으로 참여했습니다. ‘생성형 AI가 적용된 신규 컨셉 발굴 과제’를 수행하며, 생성형 AI 기반 초개인화 서비스 리서치를 진행했습니다. 생성형 AI 기술을 단순히 기능으로만 보지 않고, 사용자에게 실제 편의를 제공할 수 있는 서비스 아이디어로 구체화하고자했습니다.

이를 통해 추상적인 아이디어를 기능, 사용 맥락, 사용자 행동 흐름으로 나누어 구체화하는 방식을 익혔습니다.

※ 자세한 내용은 기밀사항이므로 많은 자료를 업로드 하지 못하는 점 양해 부탁드립니다.`,
    gradient: "bg-indigo-600/40",
    slides: [
      reportTwo,   // Screenshot 2026-06-07 at 5.29.58 AM (운동 자세 코칭 AI)
      reportOne,   // Screenshot 2026-06-07 at 5.29.47 AM
      reportThree, // Screenshot 2026-06-07 at 5.30.09 AM
      reportFour   // Screenshot 2026-06-07 at 5.30.17 AM
    ],
    hideConceptLabel: true,
    description2: "",
    deliverables: ["AI Service Concept", "Samsung Ecology Co-work", "UI/UX Scenario Design", "Product Strategy"]
  },
  {
    title: "발룬타스 봉사 동아리 기획 참여",
    category: "Volunteer",
    cardDescription: "발룬타스 봉사 동아리 기획 및 활동 참여 내역입니다.",
    description: "성신여대 1학년 때 약 60명 규모의 대학생 연합 봉사동아리 ‘발룬타스’에서 활동하며, 하반기 봉사 기획을 담당했습니다. 부원 의견 중 급식소 봉사 희망의견이 10개 이상 있음을 확인하고, 탑골공원 원각사 노인 무료 급식소 봉사를 직접 주최했습니다.",
    gradient: "bg-fuchsia-600/40",
    slides: [
      voluntasOne,
      voluntasTwo,
      voluntasThree,
      voluntasFour,
      voluntasFive,
      voluntasSix
    ],
    hideConceptLabel: true,
    description2: "",
    deliverables: ["Volunteer Planning", "Social Impact", "Community Service", "Program Design"]
  },
  {
    title: "한국사회보장정보원 창업경진대회 입선",
    category: "Award",
    cardDescription: "‘XR시니어 독서 커뮤니티 제안’ 기획으로 2024년 사회보장정보와 공공·민간 빅데이터를 활용한 국민 행복 서비스 발굴 창업경진대회에 입선하였습니다.",
    description: "2024년 사회보장정보와 공공·민간 빅데이터를 활용한 국민 행복 서비스 발굴 창업경진대회에서 ‘오아시스팀’으로 참가하여 입선하였습니다.\n\n디지털 소외층이 디지털 환경 속에서 평등하게 문화생활을 즐기고, 더 나아가 돌봄의 대상에서 벗어나 교육, 문화, 교류의 기회를 제공받아 스스로 윤택한 노년기를 꾸려나갈 수 있도록 디지털 독서 플랫폼과 XR 기술을 활용한 커뮤니티 서비스를 제안해 입선을 할 수 있었습니다.",
    gradient: "bg-cyan-500/40",
    slides: [
      smartOne,
      smartTwo,
      smartThree,
      smartFour,
      smartFive,
      smartSix,
      smartSeven,
      smartEight,
      smartNine,
      smartAward
    ],
    hideConceptLabel: true,
    description2: "※ 참고: 개명 전 이름이 '김명인'이었던 관계로, 수여받은 상장(마지막 슬라이드)에는 '김예준'이 아닌 개명 전 이름인 '김명인'으로 표기되어 있습니다.",
    deliverables: ["Award Winner", "Smart Technology", "IoT Platform", "UX Design Strategy", "Public Data Integration"]
  }

];

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeProject, setActiveProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <div className="relative min-h-screen selection:bg-sleek-blue selection:text-white">
      <AnimatedBackground />
      <Navbar />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-sleek-blue"
        style={{ scaleX }}
      />

      <main className="relative z-10">
        {/* Main Hero Display */}
        <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 md:px-12">
          <HeroDisplay />
        </section>

        {/* Work Grid */}
        <section id="work" className="container mx-auto px-12 py-32">
          <div className="mb-24 flex items-end justify-between border-b border-white/5 pb-12">
            <h2 className="text-5xl font-extralight tracking-tight text-white leading-none">
              Selected Works
            </h2>
            <div className="hidden flex-col items-end gap-2 md:flex">
              <span className="text-[10px] font-medium tracking-[0.4em] text-[#555] uppercase">Portfolio</span>
              <span className="text-[10px] font-medium tracking-[0.4em] text-[#333] uppercase">Vol. IV</span>
            </div>
          </div>
          
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, i) => (
              <PortfolioCard
                key={i}
                title={project.title}
                category={project.category}
                description={project.cardDescription || project.description}
                gradient={project.gradient}
                delay={i * 0.1}
                onClick={() => setActiveProject(project)}
              />
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="px-12 py-40">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center border-y border-white/5 py-32 text-center"
          >
            <h2 className="text-6xl font-extralight tracking-tighter text-white md:text-8xl">
              Initiate <span className="text-sleek-blue">Collaborations</span>
            </h2>
            <div className="mt-16 flex flex-col items-center gap-4 font-mono text-xs md:text-sm tracking-[0.2em] text-[#ccc]">
              <a
                href="mailto:2003ines@hanmail.net"
                className="hover:text-sleek-blue transition-colors duration-300"
              >
                email: 2003ines@hanmail.net
              </a>
              <a
                href="https://instagram.com/eulblack.ines"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sleek-blue transition-colors duration-300"
              >
                instagram: eulblack.ines
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-12 py-16">
        <div className="flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row">
          <span className="text-[10px] font-bold tracking-[0.4em] text-[#555] uppercase">INES PORTFOLIO © 2024</span>
          
          <div className="flex gap-12">
            {['Twitter', 'Instagram', 'Dribbble'].map((social) => (
              <a key={social} href="#" className="text-[10px] font-medium tracking-[0.4em] text-[#555] uppercase hover:text-white transition-colors">
                {social}
              </a>
            ))}
          </div>
          
          <span className="text-[10px] font-medium tracking-[0.4em] text-[#333] uppercase">Built for Performance</span>
        </div>
      </footer>

      {/* Theme Indicators - Absolute side dots like in the image */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {[0, 1, 2, 3].map((_, i) => (
          <div 
            key={i} 
            className={`w-1 rounded-full transition-all duration-500 ${i === 0 ? 'h-5 bg-sleek-blue' : 'h-1 bg-[#333]'}`} 
          />
        ))}
      </div>

      {/* Elegant Slideshow Overlay Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
}
