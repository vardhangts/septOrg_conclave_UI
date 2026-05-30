import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';
import { googleSheetsConfig } from '../config/googleSheets';
import { GoogleSheetRegistrationPayload, submitRegistrationToGoogleSheet } from '../utils/googleSheets';

const occupations = ['Student', 'Working Professional', 'Ready for Employment', 'Other'];

interface Props {
  compact?: boolean;
}

const RegistrationForm: React.FC<Props> = ({ compact = false }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }

    if (!age.trim()) {
      setErrorMessage('Please provide your age.');
      return;
    }

    const ageNum = Number(age.trim());
    if (!Number.isInteger(ageNum) || ageNum < 1 || ageNum > 120) {
      setErrorMessage('Please enter a valid age between 1 and 120.');
      return;
    }

    if (!phone.trim()) {
      setErrorMessage('Please provide your phone number.');
      return;
    }

    if (!/^\+?[\d\s\-().]{7,15}$/.test(phone.trim())) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Please provide your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!agreed) {
      setErrorMessage('Please agree to receive event updates before submitting.');
      return;
    }

    const payload: GoogleSheetRegistrationPayload = {
      name: name.trim(),
      age: age.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      city: city.trim() || undefined,
      occupation: occupation || undefined,
      timestamp: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);
      await submitRegistrationToGoogleSheet(googleSheetsConfig.sheetEndpointUrl, payload);
      setName('');
      setAge('');
      setEmail('');
      setPhone('');
      setCity('');
      setOccupation('');
      setAgreed(false);
      setConfirmationMessage('Registration confirmed! You will receive event updates and further communication shortly.');
    } catch (error: any) {
      setErrorMessage(error?.message || 'Unable to submit registration. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearConfirmation = () => setConfirmationMessage('');

  useEffect(() => {
    if (!confirmationMessage) {
      return;
    }

    const timeout = setTimeout(() => {
      setConfirmationMessage('');
    }, 15000);

    return () => clearTimeout(timeout);
  }, [confirmationMessage]);

  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      <Text style={[styles.title, compact && styles.titleCompact]}>Secure your seat</Text>
      <Text style={[styles.subtitle, compact && styles.subtitleCompact]}>June 14 • 3PM–7:30PM • Live event</Text>

      <TextInput
        value={name}
        onChangeText={(text: string) => {
          clearConfirmation();
          setName(text);
        }}
        placeholder="Full name *"
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, compact && styles.inputCompact]}
      />
      <TextInput
        value={age}
        onChangeText={setAge}
        placeholder="Age *"
        placeholderTextColor={colors.textSecondary}
        keyboardType="numeric"
        style={[styles.input, compact && styles.inputCompact]}
      />
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone number *"
        placeholderTextColor={colors.textSecondary}
        keyboardType="phone-pad"
        style={[styles.input, compact && styles.inputCompact]}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email address *"
        placeholderTextColor={colors.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, compact && styles.inputCompact]}
      />
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder="City"
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, compact && styles.inputCompact]}
      />
      <Text style={styles.fieldLabel}>Occupation</Text>
      <View style={styles.occupationRow}>
        {occupations.map((option) => {
          const selected = occupation === option;
          return (
            <Pressable
              key={option}
              onPress={() => setOccupation(option)}
              style={[styles.occupationOption, compact && styles.occupationOptionCompact, selected && styles.occupationOptionSelected]}
            >
              <Text style={[styles.occupationText, compact && styles.occupationTextCompact, selected && styles.occupationTextSelected]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable style={[styles.checkboxRow, compact && styles.checkboxRowCompact]} onPress={() => setAgreed(!agreed)}>
        <View style={[styles.checkbox, compact && styles.checkboxCompact, agreed && styles.checkboxChecked]}>
          {agreed ? <View style={[styles.checkboxDot, compact && styles.checkboxDotCompact]} /> : null}
        </View>
        <Text style={[styles.checkboxLabel, compact && styles.checkboxLabelCompact]}>I agree to receive event updates via Email and Whatsapp.</Text>
      </Pressable>

      <Pressable
        style={[styles.submitButton, compact && styles.submitButtonCompact]}
        onPress={handleSubmit}
        accessibilityLabel="Submit registration"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color={colors.textPrimary} />
        ) : (
          <Text style={[styles.submitText, compact && styles.submitTextCompact]}>Register now</Text>
        )}
      </Pressable>

      {errorMessage ? (
        <View style={[styles.errorBanner, styles.feedbackBanner]}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {confirmationMessage ? (
        <View style={[styles.confirmationBanner, styles.feedbackBanner]}>
          <Text style={styles.confirmationText}>{confirmationMessage}</Text>
        </View>
      ) : null}

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  cardCompact: {
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: 16,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.cardTitle,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  titleCompact: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body,
    marginBottom: spacing.lg,
  },
  subtitleCompact: {
    fontSize: 13,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    color: colors.textPrimary,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  inputCompact: {
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderRadius: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  checkboxRowCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  fieldLabel: {
    color: colors.textSecondary,
    fontSize: typography.small,
    marginBottom: spacing.sm,
  },
  occupationRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.lg,
  },
  occupationOption: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.02)',
    marginBottom: spacing.sm,
    marginRight: spacing.sm,
  },
  occupationOptionCompact: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 14,
    marginRight: spacing.xs,
  },
  occupationOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  occupationText: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
  occupationTextCompact: {
    fontSize: 14,
  },
  occupationTextSelected: {
    color: colors.textPrimary,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(229,127,65,0.08)',
  },
  checkboxCompact: {
    width: 18,
    height: 18,
    marginRight: spacing.sm,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: 'rgba(229,127,65,0.08)',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxDot: {
    width: 10,
    height: 10,
    backgroundColor: colors.textPrimary,
    borderRadius: 4,
  },
  checkboxDotCompact: {
    width: 8,
    height: 8,
    borderRadius: 3,
  },
  checkboxLabel: {
    color: colors.textPrimary,
    fontSize: typography.small,
    flex: 1,
    fontWeight: '600',
  },
  checkboxLabelCompact: {
    fontSize: 12,
  },
  feedbackBanner: {
    marginTop: spacing.md,
  },
  errorBanner: {
    backgroundColor: 'rgba(220, 53, 69, 0.12)',
    borderColor: '#dc3545',
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  errorText: {
    color: '#dc3545',
    fontSize: typography.small,
    fontWeight: '600',
  },
  confirmationBanner: {
    backgroundColor: 'rgba(0, 212, 255, 0.12)',
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  confirmationText: {
    color: colors.accent,
    fontSize: typography.body,
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  submitButtonCompact: {
    paddingVertical: spacing.sm,
    borderRadius: 14,
  },
  submitText: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: typography.body,
  },
  submitTextCompact: {
    fontSize: 14,
  },
  note: {
    color: colors.textSecondary,
    fontSize: typography.small,
    marginTop: spacing.md,
    lineHeight: 20,
  },
  noteCompact: {
    fontSize: 12,
    marginTop: spacing.sm,
  },
  warningBanner: {
    backgroundColor: 'rgba(229, 127, 65, 0.12)',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  warningText: {
    color: colors.primary,
    fontSize: typography.small,
  },
});

export default RegistrationForm;
