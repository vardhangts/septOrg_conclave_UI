import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { colors, spacing, typography } from '../styles/theme';
import FloatingButton from '../components/FloatingButton';
import RegistrationForm from '../components/RegistrationForm';
import ImageCarousel from '../components/ImageCarousel';

const { width } = Dimensions.get('window');

const logoSources = {
  left: require('../assets/logo-left.png'),
  right: require('../assets/logo-right.png'),
};

const messages = [
  {
    title: 'Healthcare for All',
    images: [
      require('../assets/image5.jpeg'),
      require('../assets/image51.jpeg'),
      require('../assets/image52.jpeg'),
    ],
    body: 'Swami\'s compassion found its most visible expression in healthcare. He established the Sri Sathya Sai Institute of Higher Medical Sciences — super-specialty hospitals in Puttaparthi and Whitefield (Bengaluru) — where complex surgeries including open-heart procedures are performed completely free of cost. With no bills, no discrimination, and no exceptions, these hospitals stand as a living testament to His belief that " Health is wealth, and it must reach every soul ." Thousands of lives have been saved and transformed, many of whom had no other hope.',
  },
  {
    title: 'Water — The Gift of Life',
    images: [
      require('../assets/image6.jpeg'),
      require('../assets/image61.jpeg'),
      require('../assets/image62.jpg'),
    ],
    body: 'Recognising that clean drinking water was beyond the reach of millions, Swami undertook one of independent India\'s largest humanitarian water supply projects. The Sri Sathya Sai Drinking Water Project brought safe, piped drinking water to over 1.2 million people across 750+ villages in drought-prone Anantapur district, Andhra Pradesh — an area that had suffered for decades. A second major project extended this gift to the cities of Chennai and Medak. No government funding, no fanfare — just pure, unconditional love in action.',
  },
  {
    title: 'Education Rooted in Values',
    images: [
      require('../assets/image7.jpeg'),
      require('../assets/image71.jpg'),
      require('../assets/image72.jpg'),
      require('../assets/image73.jpg'),
    ],
    body: 'Swami believed that "Education is not for a living — it is for life. " He built a network of free schools, colleges, and the Sri Sathya Sai Institute of Higher Learning (a deemed university) that offers world-class education at no cost to students. Beyond academics, His institutions focus on character-building, discipline, and service — nurturing not just bright minds, but good human beings. Thousands of alumni across the world carry forward His vision of an education that transforms from within.',
  },
];

const projects = [
  {
    title: 'Sri Sathya Sai Skill Development',
    images: [
      require('../assets/image8.jpg'),
      require('../assets/image81.jpg'),
      require('../assets/image82.jpg'),
    ],
    description: 'Bridging the gap between classroom and career, this initiative runs a dedicated bridge programme to make students job-ready. Young people who finish school without employable skills are equipped with practical training, confidence, and a pathway to livelihood — turning potential into purpose.',
    metric: '320+ Beneficiaries',
  },
  {
    title: 'Sri Sathya Sai Premamrutha Dhara',
    images: [
      require('../assets/image9.jpg'),
      require('../assets/image91.jpg'),
      require('../assets/image93.jpg'),
    ],
    description: 'Safe drinking water remains a distant dream for many tribal communities. Premamrutha Dhara brings clean, piped drinking water directly to these underserved villages — ensuring that no family has to walk miles or drink unsafe water. It is love, flowing literally.',
    metric: '50 Villages 10000 + Beneficiaries',
  },
  {
    title: 'Sri Sathya Sai Summer Water Camps',
    images: [
      require('../assets/image10.jpeg'),
      require('../assets/image101.jpeg'),
      require('../assets/image102.jpeg'),
    ],
    description: 'Every summer, thousands of commuters brave Hyderabad\'s scorching heat with no access to drinking water. Volunteers set up water distribution camps at busy junctions and public spaces, quenching the thirst of thousands — a small act of seva with an enormous human touch.',
    metric: '2 Million + Beneficiaries',
  },
  {
    title: 'Sri Sathya Sai Bala Suraksha',
    images: [
      require('../assets/image11.jpg'),
      require('../assets/image111.jpg'),
      require('../assets/image112.jpg'),
    ],
    description: 'Dental health is often the most neglected aspect of a child\'s wellbeing. Through regular dental camps in government schools, Bala Suraksha brings professional dental care — screenings, treatment, and awareness — directly to children who would otherwise never have access to it.',
    metric: '3000 + Beneficiaries',
  },
  {
    title: 'Sri Sathya Sai Educare',
    images: [
      require('../assets/image12.jpg'),
      require('../assets/image121.jpg'),
      require('../assets/image122.jpg'),
    ],
    description: 'More than just donating books, Educare adopts government schools wholesale — providing infrastructure, learning materials, uniforms, and ongoing support to ensure every child has a dignified, well-resourced learning environment. Education, as Swami taught, is a right, not a privilege.',
    metric: '200 + Beneficiaries',
  },
  {
    title: 'Sri Sathya Sai Higher Education Support',
    images: [
      require('../assets/image13.jpg'),
      require('../assets/image131.jpg'),
      require('../assets/image132.jpg'),
    ],
    description: 'Talent should never surrender to poverty. This initiative supports meritorious students from low-income families in pursuing college education — covering fees, materials, and mentorship — so that financial hardship is never the reason a young person\'s dream goes unfulfilled.',
    metric: '50 Beneficiaries',
  },
];

const EventLandingScreen = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [registrationY, setRegistrationY] = useState(0);
  const [showFab, setShowFab] = useState(false);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const isMobile = windowWidth <= 760;
  const carouselHeight = Math.min(windowHeight * 0.9, 812);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    setShowFab(y > 280);
  };

  const scrollToRegistration = () => {
    if (Platform.OS === 'web') {
      const el = document.getElementById('registration');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    scrollRef.current?.scrollTo({ y: registrationY - 20, animated: true });
  };

  return (
    <View style={styles.page}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.hero}>
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Image source={logoSources.left} style={styles.logoImage} resizeMode="contain" />
            </View>
            <View style={styles.logoBadge}>
              <Image source={logoSources.right} style={styles.logoImage} resizeMode="contain" />
            </View>
          </View>
          <View style={styles.heroGlow} />
          <View style={styles.heroCopy}>
            <Text style={styles.heroLabel}>Sai Infinite Conclave</Text>
            <Text style={styles.heroTitle}>100 YEARS . ONE MISSION . INFINITE IMPACT.</Text>
            <Text style={styles.heroSubtitle}>{'June 14, 2026 • 3PM–7:30PM\n\nAuditorium, Jawaharlal Nehru Architecture and Fine Arts University,\nMasab Tank, Hyderabad.'}</Text>
            <Text style={styles.heroDescription}>Special Address by Padmashri Dr Garikapati V B Narsimha Rao</Text>
            <View style={styles.heroCtas}>
              <Text onPress={scrollToRegistration} style={styles.ctaButton}>Register now</Text>
            </View>
          </View>
        </View>

        <View nativeID="registration" style={[styles.section, styles.sectionAlt]} onLayout={(event: LayoutChangeEvent) => setRegistrationY(event.nativeEvent.layout.y)}>
          <Text style={styles.sectionTitle}>Register now</Text>
          <Text style={styles.sectionText}>Complete the form to save your seat and receive event updates.</Text>

          <View style={styles.formRow}>
            <View style={[styles.formColumn, { height: carouselHeight }] }>
              <ScrollView contentContainerStyle={styles.formScrollContent} showsVerticalScrollIndicator={false}>
                <RegistrationForm compact={width > 760} />
              </ScrollView>
            </View>

            <View style={[styles.carouselColumn, { height: carouselHeight }] }>
              <ImageCarousel height={carouselHeight} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why This Conclave?</Text>
          <Text style={styles.sectionText}>
            Marking 100 years of Sri Sathya Sai Baba's mission of love, service, and human transformation — this conclave unites society at large which is a living testimony to decades of impact across Telangana, India and the World. Our Loving Tribute to Him.
          </Text>
          <View style={styles.featureGrid}>
            <View style={[styles.featureCard, isMobile && styles.featureCardFull]}>
              <Text style={styles.cardTitle}>Sri Sathya Sai Baba — The Embodiment of Love</Text>
              <Text style={styles.cardText}>Sri Sathya Sai Baba (1926– Forever) was one of the most beloved spiritual masters of the modern era. Born in the small village of Puttaparthi, Andhra Pradesh, He dedicated His entire life to the upliftment of humanity — inspiring millions across the globe with His timeless message: "Love All, Serve All."
                His teachings were simple yet profound — Truth (Sathya), Right Conduct (Dharma), Peace (Shanti), Love (Prema), and Non-violence (Ahimsa). He believed that every human being carries the divine within, and that selfless service is the highest form of worship.
                Swami's life was His message. He established free super-specialty hospitals, schools and universities offering value-based education, and drinking water projects serving millions — all as expressions of His boundless compassion.</Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, styles.sectionAlt]}>
          <Text style={styles.sectionTitle}>His Expressions of Love</Text>
          {messages.map((message) => (
            <View key={message.title} style={styles.messageCard}>
              <Text style={styles.messageTitle}>{message.title}</Text>
              {message.images.length > 0 ? (
                <ImageCarousel images={message.images} height={180} intervalMs={4000} />
              ) : (
                <View style={styles.messageImagePlaceholder} />
              )}
              <Text style={styles.messageBody}>{message.body}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Offerings to Him</Text>
          <View style={styles.projectGrid}>
            {projects.map((project) => (
              <View key={project.title} style={styles.projectCard}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                {project.images.length > 0 ? (
                  <ImageCarousel images={project.images} height={180} intervalMs={4000} />
                ) : (
                  <View style={styles.projectImagePlaceholder} />
                )}
                <Text style={styles.projectText}>{project.description}</Text>
                <Text style={styles.projectMetric}>{project.metric}</Text>
              </View>
            ))}
          </View>
        </View>



        <View style={styles.footer}> 
          <Text style={styles.footerText}>Sethu.ai Empowering youth through skill development, value-based education, and selfless service inspired by the teachings of Bhagawan Sri Sathya Sai Baba.</Text>
        </View>
      </ScrollView>
      <FloatingButton onPress={scrollToRegistration} visible={showFab} />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xxl,
  },
  hero: {
    width: '100%',
    minHeight: 520,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  heroImage: {
    opacity: 0.2,
  },
  heroGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(229,127,65,0.16)',
  },
  logoRow: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    marginBottom: spacing.sm,
  },
  heroCopy: {
    maxWidth: width - 40,
    paddingTop: width > 760 ? 72 : 100,
  },
  heroLabel: {
    color: colors.white,
    fontSize: typography.sectionTitle,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  heroTitle: {
    color: colors.white,
    fontSize: width > 760 ? typography.hero : 42,
    fontWeight: '800',
    lineHeight: width > 760 ? 72 : 48,
    marginBottom: spacing.md,
  },
  heroSubtitle: {
    color: colors.white,
    fontSize: typography.body,
    marginBottom: spacing.md,
  },
  heroDescription: {
    color: colors.white,
    fontSize: typography.body,
    lineHeight: 24,
    marginBottom: spacing.xl,
    maxWidth: 640,
  },
  logoBadge: {
    minWidth: width > 760 ? 100 : 72,
    height: width > 760 ? 100 : 72,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderColor: 'rgba(255,255,255,0.24)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  logoImage: {
    width: width > 760 ? 96 : 60,
    height: width > 760 ? 96 : 60,
  },
  heroCtas: {
    flexDirection: 'row',
  },
  ctaButton: {
    backgroundColor: colors.white,
    color: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 999,
    overflow: 'hidden',
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    backgroundColor: colors.white,
  },
  sectionAlt: {
    backgroundColor: colors.surfaceAlt,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.sectionTitle,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  sectionText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 24,
    marginBottom: spacing.lg,
    maxWidth: 760,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  featureCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  featureCardFull: {
    width: '100%',
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: typography.sectionTitle,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  cardText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  messageCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  messageTitle: {
    color: colors.textPrimary,
    fontSize: typography.cardTitle,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  messageBody: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  messageImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  messageImagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: colors.border,
    marginBottom: spacing.sm,
  },
  projectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  projectCard: {
    width: width > 760 ? '48%' : '100%',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  projectTitle: {
    color: colors.textPrimary,
    fontSize: typography.cardTitle,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  projectImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  projectImagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    backgroundColor: colors.border,
    marginBottom: spacing.sm,
  },
  projectText: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  projectMetric: {
    color: colors.accent,
    fontSize: typography.small,
    fontWeight: '700',
  },
  formRow: {
    flexDirection: width > 760 ? 'row' : 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  carouselColumn: {
    width: width > 760 ? '45%' : '100%',
  },
  formColumn: {
    width: width > 760 ? '50%' : '100%',
    alignSelf: 'flex-start',
    paddingLeft: width > 760 ? spacing.lg : 0,
  },
  formScrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: typography.small,
    lineHeight: 20,
  },
});

export default EventLandingScreen;
