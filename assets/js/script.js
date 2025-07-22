'use strict';

// Element seçicileri
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

// Sidebar (Kenar Çubuğu) fonksiyonu
if (sidebarBtn) {
  sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

// Navigasyon linkleri ve sayfa geçişleri
if (navLinks.length > 0 && pages.length > 0) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetPage = link.dataset.targetPage;

      navLinks.forEach(item => item.classList.remove('active'));
      pages.forEach(item => item.classList.remove('active'));

      link.classList.add('active');

      const pageToShow = document.querySelector(`[data-page="${targetPage}"]`);
      if (pageToShow) {
        pageToShow.classList.add('active');
        window.scrollTo(0, 0);
      }
    });
  });
}

// Testimonials modal (referanslar pop-up'ı)
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const openTestimonialModal = function () {
  modalContainer.classList.add('active');
  overlay.classList.add('active');
}

const closeTestimonialModal = function () {
  modalContainer.classList.remove('active');
  overlay.classList.remove('active');
}

if (testimonialsItem.length > 0 && modalContainer && modalCloseBtn && overlay) {
  testimonialsItem.forEach(item => {
    item.addEventListener('click', function () {
      modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
      modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
      modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
      modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;
      openTestimonialModal();
    });
  });

  modalCloseBtn.addEventListener('click', closeTestimonialModal);
  overlay.addEventListener('click', closeTestimonialModal);
}

// Custom select box ve filtreleme işlevselliği
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtns = document.querySelectorAll('[data-filter-btn]'); 

// Proje öğelerini filtreleme için yeni bir sabit tanımlandı
const projectItems = document.querySelectorAll('[data-filter-item]');

// Projeleri filtreleme fonksiyonu
const filterItems = function (category) {
  // Translate the category to its internal key if it's in Turkish
  let categoryKey = '';
  // Simple mapping for demonstration. In a real app, you'd translate the button text.
  if (category === 'Tümü' || category === 'All') {
    categoryKey = 'all';
  } else if (category === 'Siber Güvenlik' || category === 'Cyber Security') {
    categoryKey = 'siberguvenlik';
  } else if (category === 'Yazılım' || category === 'Software') {
    categoryKey = 'yazilim';
  } else if (category === 'Ağ Sistemleri' || category === 'Network') {
    categoryKey = 'agsistemleri';
  }

  projectItems.forEach(item => {
    if (categoryKey === 'all' || item.dataset.category === categoryKey) {
      item.classList.add('active'); 
    } else {
      item.classList.remove('active');
    }
  });
};


if (select && selectItems.length > 0 && selectValue && filterBtns.length > 0) {
  select.addEventListener('click', function () {
    this.classList.toggle('active');
  });

  selectItems.forEach(item => {
    item.addEventListener('click', function () {
      let selectedText = this.innerText;
      selectValue.innerText = selectedText;
      select.classList.remove('active');
      filterItems(selectedText); 
    });
  });

  // Filtre butonları için olay dinleyicileri
  filterBtns.forEach(button => {
    button.addEventListener('click', function () {
      // Tüm filtre butonlarından 'active' sınıfını kaldır
      filterBtns.forEach(btn => btn.classList.remove('active'));
      // Tıklanan butona 'active' sınıfını ekle
      this.classList.add('active');
      // Butonun içindeki metni al ve filtreleme fonksiyonuna gönder
      filterItems(this.innerText); 
    });
  });
}

// Sayfa yüklendiğinde tüm projelerin görünmesini sağla
document.addEventListener('DOMContentLoaded', () => {
    filterItems('Tümü'); // Başlangıçta tüm projeleri göster (Türkçe varsayılan)
});

// Contact form validation (İletişim formu doğrulama)
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formInputs.length > 0 && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener('input', function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute('disabled');
      } else {
        formBtn.setAttribute('disabled', '');
      }
    });
  });
}

// Language Switcher (Dil Değiştirme)
const langButtons = document.querySelectorAll('.lang-button');
const htmlElement = document.querySelector('html');

const translations = {
  tr: {
    // Sidebar
    'Jr. Siber Güvenlik Uzmanı': 'Jr. Siber Güvenlik Uzmanı',
    'Kişisel Bilgileri Göster': 'Kişisel Bilgileri Göster',
    'E-mail': 'E-mail',
    'Yaş': 'Yaş',
    'Konum': 'Konum',
    'Kocaeli, - Türkiye': 'Kocaeli, - Türkiye',

    // Navbar
    'Hakkımda': 'Hakkımda',
    'Eğitimler ve Sertifikalar': 'Eğitimler ve Sertifikalar',
    'Projeler': 'Projeler',
    'Blog': 'Blog',
    'İletişim': 'İletişim',
    'gelisim': 'Kişisel Gelişim',
    'gelisim2': 'Mezuniyet sonrası, Siber Güvenlik ve Sistem Yöneticiliği yolunda  ilerlemek için çeşitli çevrim içi eğitimler ve sertifikalı kurslar tamamladım. Sürekli yeni projeler geliştirerek gelişim odaklı bir yaklaşımla teknik bilgimi ve becerilerimi güncel tutuyorum.',
    'gelisim3': '2022 Haziran - Devam Ediyor',


    // About Page
    'HakkımdaTitle': 'Hakkımda',
    'about-text-1': 'Bilişim Teknolojileri sektöründeki yolculuğuma 16 yaşımda başladım. Ağ İşletmenliği ve Siber Güvenlik odaklı mesleki lise eğitimim sırasında, İspanya’da ve Türkiye’de olmak üzere üç farklı şirkette yaptığım stajlarla teorik bilgilerimi pratikle pekiştirdim. Mezuniyet sonrası Siber Güvenlik alanında uzmanlaşmaya devam ettim.',
    'about-text-2': 'Çalışmalarımı Network Security & Pentesting üzerine sürdürmekteyim. Güncel teknolojileri takip ediyor, kişisel projelerim ve tamamladığım çevrim içi kurslarla kendimi sürekli geliştiriyorum. Web Application Security, System Administrator, Bug Bounty ve Web Development gibi alanlarda da en az temel seviyede bilgi ve deneyime sahibim. Yeni teknolojilere hızlı adapte olabilen ve farklı pozisyonlarda sorumluluk almaya istekli bir yapıya sahibim.',
    'about-text-3': 'Amacım; problem çözme, analitik düşünme ve uygulama becerilerimi kullanarak teorik bilgi birkimimi pratiğe dökmek, ve içinde yer alacağım ekibe yeni değerler katmak.',
    'Neler Yapabiliyorum?': 'Neler Yapabiliyorum?',
    'Sızma Testleri': 'Sızma Testleri',
    'penetration-test-description': 'Ağ sistemleri ve Web sitelerindeki güvenlik açıklarını tespit edip raporlayarak sitemleri daha güvenli hale getirmek için sızma testleri yapabilirim. <br><br>Kötü niyetli kişilerin maddi ve manevi zararlara yol açmasını engelleyerek müşterilerinizin size olan güvenlerini koruyabilirim.',
    'Ağ & Sistem Mühendisliği': 'Ağ & Sistem Mühendisliği',
    'network-system-engineering-description': 'Bilgisayar ağları (LAN, WAN, VPN vb.) tasarlamak, kurmak, yapılandırmak, yönetmek ve sorun gidermek gibi görevleri üstlenebilirim. <br><br> Ağ cihazlarının (router, switch, firewall vb.) kurulumunu yapmak, ağ güvenliğini sağlamak ve veri akışını optimize etmek gibi ihtiyaçlara çözüm sağlayabilirim.',
    'Web Güvenliği': 'Web Güvenliği',
    'web-security-description': 'Web uygulamalarında sızma testleri yaparak sitelerdeki açıkları tespit edebilir ve raporlayabilirim. (OWASP Top 10, SQL Injection, XSS, CSRF, RCE, vb.)',
    'Ağ Sistemleri Güvenliği': 'Ağ Sistemleri Güvenliği',
    'network-systems-security-description': 'TCP/IP ağlardaki port/servis exploit, konfigürasyon, segmentasyon, AD/LDAP, SIEM, IDS/IPS, Firewall gibi sistemlerinizi test edip detaylı raporlama yapabilirim.',

    // Resume Page
    'Eğitimler': 'Eğitimler',
    'Deneyim': 'Deneyim',
    'Web Geliştiricisi - Stajyer': 'Web Geliştiricisi - Stajyer',
    'Avrupa Birliği Ofisi - İzmit M.T.A.L': 'Avrupa Birliği Ofisi - İzmit M.T.A.L',
    'exp-1-date': '2022 Nisan - 2022 Haziran',
    'exp-1-description': '• Modern Web geliştirme prensipleri ve uygulamaları doğrultusunda dinamik ve kullanıcı odaklı web siteleri tasarımı ve geliştirilmesi.',
    'Yazılım Geliştiricisi - Stajyer': 'Yazılım Geliştiricisi - Stajyer',
    'Robkod': 'Robkod',
    'exp-2-date': '2021 Aralık  - 2022 Mart',
    'exp-2-description': '• Siber güvenlik alanında Mac Changer, Network Scanner, MITM Tool, Packet Listener, Keylogger, Backdoor ve Buffer Overflow Exploit gibi gelişmiş araçların konseptinden uygulamasına kadar tasarlanması ve geliştirilmesi.',
    'Ağ Sistemleri Mühendisi - Stajyer': 'Ağ Sistemleri Mühendisi - Stajyer',
    'SeviManager (Sevilla, İspanya)': 'SeviManager (Sevilla, İspanya)',
    'exp-3-date': 'Ağustos 2021 - Kasım 2021',
    'exp-3-description': '• Kurumsal ağ altyapılarının tasarlanması, kurulması ve etkin bir şekilde yönetilmesi. <br><br>• Switch, Router, Firewall gibi ağ cihazlarının yapılandırılması, optimizasyonu ve güvenliğinin sağlanması. <br><br>• Ağ performansının izlenmesi, sorun giderme ve sürekli iyileştirme çalışmaları. <br><br>• Kullanıcı desteği sağlama ve ağ ile ilgili teknik sorunları çözme.',
    'Eğitim': 'Eğitim',
    'Ağ İşletmenliği ve Siber Güvenlik - Bilişim Teknolojileri': 'Ağ İşletmenliği ve Siber Güvenlik - Bilişim Teknolojileri',
    'İzmit Mesleki ve Teknik Anadolu Lisesi': 'İzmit Mesleki ve Teknik Anadolu Lisesi',
    'edu-1-date': '2018 — 2022',
    
    // Certificates
    'Sertifikalar': 'Sertifikalar',
    'Siber Güvenlik Uzmanlığı Eğitimi': 'Siber Güvenlik Uzmanlığı Eğitimi',
    'Global Cyber Academy': 'Global Cyber Academy',
    'cert-1-date': 'Mart 2023 - Kasım 2023',
    'cert-1-description': '• Temel Ağ Bilgisi, Linux, Sızma Testleri, SIEM, SOC Analistliği, Zararlı Yazılım Analizi konularında kapsamlı eğitim.',
    'Bug Bounty Eğitimi': 'Bug Bounty Eğitimi',
    'Udemy': 'Udemy',
    'cert-2-date': '2022 Haziran',
    'cert-2-description': '• Web Uygulama Güvenliği, sızma testleri ve zafiyet avcılığı konularında pratik bilgi ve deneyim.',
    'Python ile Temel Programlama': 'Python ile Temel Programlama',
    'BTK Akademi': 'BTK Akademi',
    'cert-3-date': '2021',
    'cert-3-description': '• Python programlama dilinin temelleri, algoritma geliştirme ve veri yapıları.',
    'Erasmus': 'Erasmus Katılım ve Başarı Belgeleri',
    'msb': 'Takdir ve Bonservis Belgeleri',
    'msb2': 'Milli Savunma Bakanlığı - Genelkurmay Başkanlığıi',



    // Portfolio Page     

    'ProjelerTitle': 'Projeler',
    'Tümü': 'Tümü',
    'Siber Güvenlik': 'Siber Güvenlik',
    'Yazılım': 'Yazılım',
    'Ağ Sistemleri': 'Ağ Sistemleri',
    'Kategori Seç': 'Kategori Seç',

    // Blog Page
    'BlogTitle': 'Blog',
    'BlogDate1': 'Şubat 23, 2022',
    'Nmap Parametreleri': 'Nmap Parametreleri',
    'Nmap scriptlerine çalıştım.': 'Nmap scriptlerine çalıştım.',

    // Contact Page
    'İletişimTitle': 'İletişim',
    'İletişim Formu': 'İletişim Formu',
    'Ad Soyad': 'Ad Soyad',
    'E-mail Adresi': 'E-mail Adresi',
    'Mesajınız': 'Mesajınız',
    'Mesajı Gönder': 'Mesajı Gönder'
  },
  en: {
    // Sidebar
    'Jr. Siber Güvenlik Uzmanı': 'Jr. Cyber Security Specialist',
    'Kişisel Bilgileri Göster': 'BruteForce',
    'E-mail': 'E-mail',
    'Yaş': 'Age',
    'Konum': 'Location',
    'Kocaeli, Türkiye': 'Kocaeli, Turkiye',

    // Navbar
    'Hakkımda': 'About',
    'Eğitimler ve Sertifikalar': 'Resume',
    'Projeler': 'Projects',
    'Blog': 'Blog',
    'İletişim': 'Contact',
    'gelisim': 'Personal Development',
    'gelisim2': 'After graduation, I completed various online training and certified courses to advance my Cybersecurity and Systems Administration path. I maintain my technical knowledge and skills up-to-date by constantly developing new projects and maintaining a development-focused approach.',
    'gelisim3': '2022 June - Present',

    // About Page
    'HakkımdaTitle': 'About Me',
    'about-text-1': 'I started my journey in the IT sector at the age of 16. During my vocational high school education, which focused on Network Administration and Cyber Security, I solidified my theoretical knowledge with practical experience through internships at three different companies in Spain and Turkey. After graduation, I continued to specialize in Cyber Security.',
    'about-text-2': 'My current work is focused on Network Security & Pentesting. I stay updated with current technologies and continuously improve myself through personal projects and completed online courses. I possess at least a foundational level of knowledge and experience in areas such as Web Application Security, System Administration, Bug Bounty, and Web Development. I am quick to adapt to new technologies and eager to take on responsibilities in various roles.',
    'about-text-3': 'My objective is to translate my theoretical knowledge into practice by utilizing my problem-solving, analytical thinking, and application skills, and to contribute new value to the team I join.',
    'Neler Yapabiliyorum?': 'What I Can Do?',
    'Sızma Testleri': 'Penetration Testing',
    'penetration-test-description': 'I can conduct penetration tests to enhance system security by identifying and reporting vulnerabilities in Network and websites. <br><br>I can prevent malicious actors from causing financial and moral damages, thereby safeguarding your clients\' trust in you.',
    'Ağ & Sistem Mühendisliği': 'Network & System Engineering',
    'network-system-engineering-description': 'I am capable of undertaking tasks such as designing, establishing, configuring, managing, and troubleshooting computer networks (LAN, WAN, VPN, etc.). <br><br> I can provide solutions for requirements such as installing network devices (routers, switches, firewalls, etc.), ensuring network security, and optimizing data flow.',
    'Web Güvenliği': 'Web Security',
    'web-security-description': 'I can perform penetration tests on web applications to identify and report vulnerabilities on websites (e.g., OWASP Top 10, SQL Injection, XSS, CSRF, RCE).',
    'Ağ Sistemleri Güvenliği': 'Network Security',
    'network-systems-security-description': 'I can test your systems for port/service exploits, configurations, segmentation, AD/LDAP, SIEM, IDS/IPS, and Firewall bypass in TCP/IP networks, and provide detailed reports.',

    // Resume Page
    'Eğitimler': 'Education',
    'Deneyim': 'Experience',
    'Web Geliştiricisi - Stajyer': 'Web Developer - Intern',
    'Avrupa Birliği Ofisi - İzmit M.T.A.L': 'European Union Office - Izmit Vocational High School',
    'exp-1-date': 'April 2022 - June 2022',
    'exp-1-description': '• Designed and developed dynamic and user-centric websites in accordance with modern web development principles and practices.',
    'Yazılım Geliştiricisi - Stajyer': 'Programmer - Intern',
    'Robkod': 'Robkod',
    'exp-2-date': 'December 2021 - March 2022',
    'exp-2-description': '• Designed and developed advanced tools in cyber security, from concept to implementation, including Mac Changer, Network Scanner, MITM Tool, Packet Listener, Keylogger, Backdoor, and Buffer Overflow Exploit.',
    'Ağ Sistemleri Mühendisi - Stajyer': 'Network Engineer - Intern',
    'SeviManager (Sevilla, İspanya)': 'SeviManager (Seville, Spain)',
    'exp-3-date': 'August 2021 - November 2021',
    'exp-3-description': '• Designed, established, and effectively managed corporate network infrastructures. <br><br>• Configured, optimized, and secured network devices such as switches, routers, and firewalls. <br><br>• Monitored network performance, performed troubleshooting, and engaged in continuous improvement efforts. <br><br>• Provided user support and resolved network-related technical issues.',
    'Eğitim': 'Education',
    'Ağ İşletmenliği ve Siber Güvenlik - Bilişim Teknolojileri': 'Network Administration and Cyber Security - Information Technologies',
    'İzmit Mesleki ve Teknik Anadolu Lisesi': 'Izmit Vocational High School',
    'edu-1-date': '2018 — 2022',

    // Certificates
    'Sertifikalar': 'Certificates',
    'Siber Güvenlik Uzmanlığı Eğitimi': 'Cyber Security Specialist Training',
    'Global Cyber Academy': 'Global Cyber Academy',
    'cert-1-date': 'March 2023 - November 2023',
    'cert-1-description': '• Comprehensive training in fundamental network knowledge, Linux, penetration testing, SIEM, SOC analysis, and malware analysis.',
    'Bug Bounty Eğitimi': 'Bug Bounty Training',
    'Udemy': 'Udemy',
    'cert-2-date': '2022 June',
    'cert-2-description': '• Practical knowledge and experience in web application security, penetration testing, and vulnerability hunting.',
    'Python ile Temel Programlama': 'Basic Programming with Python',
    'BTK Akademi': 'BTK Academy',
    'cert-3-date': '2021',
    'cert-3-description': '• Fundamentals of Python programming language, algorithm development, and data structures.',
    'Erasmus': 'Erasmus Participation and Achievement Certificates',
    'msb': 'Certificates of Appreciation and Recognition',
    'msb2': 'Ministry of National Defense - General Staff of the Turkish Armed Forces',


    // Portfolio Page
    'ProjelerTitle': 'Projects',
    'Tümü': 'All',
    'Siber Güvenlik': 'Cyber Security',
    'Yazılım': 'Software',
    'Ağ Sistemleri': 'Network',
    'Kategori Seç': 'Select Category',

    // Blog Page
    'BlogTitle': 'Blog',
    'BlogDate1': 'February 23, 2022',
    'Nmap Parametreleri': 'Nmap Parameters',
    'Nmap scriptlerine çalıştım.': 'I worked on Nmap scripts.',

    // Contact Page
    'İletişimTitle': 'Contact',
    'İletişim Formu': 'Contact Form',
    'Ad Soyad': 'Full Name',
    'E-mail Adresi': 'E-mail Address',
    'Mesajınız': 'Your Message',
    'Mesajı Gönder': 'Send Message'
  }
};

const updateContent = (lang) => {
  htmlElement.setAttribute('lang', lang);

  // Update elements with data-translation-key
  document.querySelectorAll('[data-translation-key]').forEach(element => {
    const key = element.dataset.translationKey;
    if (translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  // Update placeholder attributes with data-translation-placeholder-key
  document.querySelectorAll('[data-translation-placeholder-key]').forEach(element => {
    const key = element.dataset.translationPlaceholderKey;
    if (translations[lang][key]) {
      element.setAttribute('placeholder', translations[lang][key]);
    }
  });
};

langButtons.forEach(button => {
  button.addEventListener('click', () => {
    langButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    updateContent(button.dataset.lang);
  });
});

// Set initial language based on browser preference or default to Turkish
const userLang = navigator.language.startsWith('en') ? 'en' : 'tr';
updateContent(userLang);
// Set the active button on load
document.querySelector(`.lang-button[data-lang="${userLang}"]`).classList.add('active');