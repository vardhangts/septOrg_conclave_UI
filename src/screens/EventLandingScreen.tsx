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

const projects = [
  {
    title: 'Sri Sathya Sai Skill Development',
    description: 'Skill Development and Vocational Training for the youth, guided by industry leaders and adaptive learning platforms.',
    metric: '500+ students trained',
  },
  {
    title: 'Sri Sathya Sai Summer Water Camps',
    description: 'Community-driven water conservation projects with real-time monitoring and impact analytics.',
    metric: '10+ villages transformed',
  },
  {
    title: 'Sri Sathya Sai Bala Suraksha',
    description: 'Details here...',
    metric: 'metrics here...',
  },
  {
    title: 'Sri Sathya Sai Educare',
    description: 'Details here...',
    metric: 'Metrics here...',
  },
  {
    title: 'Sri Sathya Sai Higher Education',
    description: 'Details here...',
    metric: 'Metrics here...',
  },
  {
    title: 'Sri Sathya Sai Premrutha Dhara',
    description: 'Details here...',
    metric: 'Metrics here...',
  },
];

const EventLandingScreen = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [registrationY, setRegistrationY] = useState(0);
  const [showFab, setShowFab] = useState(false);
  const windowHeight = Dimensions.get('window').height;
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
            <Text style={styles.heroTitle}>100 YEARS . ONE MISSION . INFINITE IMPACT</Text>
            <Text style={styles.heroSubtitle}>June 14, 2026 • 3PM–7:30PM • Auditorium, JNTU, Masab Tank, Hyderabad</Text>
            <Text style={styles.heroDescription}>Special Address by Padmashri Dr Garikapati V B Narsimha Rao</Text>
            <View style={styles.heroCtas}>
              <Text onPress={scrollToRegistration} style={styles.ctaButton}>Register now</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why This Conclave?</Text>
          <Text style={styles.sectionText}>
            Marking 100 years of Sri Sathya Sai Baba's mission of love, service, and human transformation — this conclave unites society at large which is a living testimony to decades of impact across Telangana, India and the World. Our Loving Tribute to Him.
          </Text>
          <View style={styles.featureGrid}>
            <View style={styles.featureCard}>
              <Text style={styles.cardTitle}>His Message</Text>
              <Text style={styles.cardText}>One liner message here...</Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.cardTitle}>Message 2</Text>
              <Text style={styles.cardText}>Second message here...</Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, styles.sectionAlt]}>
          <Text style={styles.sectionTitle}>Messages</Text>
          <View style={styles.messageCard}>
            <Text style={styles.messageTitle}>“People-first AI is the only way forward for social impact.”</Text>
            <Text style={styles.messageBody}>Sethu.ai is building tools that respect human judgment while applying powerful automation to everyday challenges.</Text>
          </View>
          <View style={styles.messageCard}>
            <Text style={styles.messageTitle}>“We design systems that can be trusted, audited, and scaled.”</Text>
            <Text style={styles.messageBody}>Our approach bridges technical depth with clear community value.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured projects - Over 40,000 Beneficiaries</Text>
          <View style={styles.projectGrid}>
            {projects.map((project) => (
              <View key={project.title} style={styles.projectCard}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectText}>{project.description}</Text>
                <Text style={styles.projectMetric}>{project.metric}</Text>
              </View>
            ))}
          </View>
        </View>

        <View nativeID="registration" style={[styles.section, styles.sectionAlt]} onLayout={(event: LayoutChangeEvent) => setRegistrationY(event.nativeEvent.layout.y)}>
          <Text style={styles.sectionTitle}>Register now</Text>
          <Text style={styles.sectionText}>Complete the form to save your seat and receive event updates through Google Sheets integration.</Text>

          <View style={styles.formRow}>
            <View style={[styles.carouselColumn, { height: carouselHeight }] }>
              <ImageCarousel height={carouselHeight} />
            </View>

            <View style={[styles.formColumn, { height: carouselHeight }] }>
              <ScrollView contentContainerStyle={styles.formScrollContent} showsVerticalScrollIndicator={false}>
                <RegistrationForm compact={width > 760} />
              </ScrollView>
            </View>
          </View>
        </View>

        <View style={styles.footer}> 
          <Text style={styles.footerText}>Sethu.ai presents a focused event for NGOs, technologists, and change agents.</Text>
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
    justifyContent: 'flex-end',
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
  },
  heroCopy: {
    maxWidth: width - 40,
  },
  heroLabel: {
    color: colors.white,
    fontSize: typography.sectionTitle,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  heroTitle: {
    color: colors.white,
    fontSize: typography.hero,
    fontWeight: '800',
    lineHeight: 72,
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
    minWidth: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderColor: 'rgba(255,255,255,0.24)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  logoImage: {
    width: 96,
    height: 96,
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
  },
  featureCard: {
    width: width > 760 ? '48%' : '100%',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: typography.cardTitle,
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
