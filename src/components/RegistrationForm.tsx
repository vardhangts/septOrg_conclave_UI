import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';
import { googleSheetsConfig } from '../config/googleSheets';
import { GoogleSheetRegistrationPayload, submitRegistrationToGoogleSheet } from '../utils/googleSheets';

const occupations = ['Student', 'Working Professional', 'Unemployed'];

interface Props {
  compact?: boolean;
}

const RegistrationForm: React.FC<Props> = ({ compact = false }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [occupation, setOccupation] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleSubmit = async () => {
    if (!name.trim() || (!email.trim() && !phone.trim())) {
      Alert.alert('Missing information', 'Please provide your name and either a phone number or email to register.');
      return;
    }

    if (!occupation) {
      Alert.alert('Select occupation', 'Please choose whether you are a student, working professional, or unemployed.');
      return;
    }

    if (!agreed) {
      Alert.alert('Consent required', 'Please agree to share your contact details for event updates.');
      return;
    }

    const payload: GoogleSheetRegistrationPayload = {
      name: name.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      city: city.trim(),
      occupation,
      timestamp: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);
      await submitRegistrationToGoogleSheet(googleSheetsConfig.sheetEndpointUrl, payload);
      setName('');
      setEmail('');
      setPhone('');
      setCity('');
      setOccupation('');
      setAgreed(false);
      setConfirmationMessage('Registration confirmed. We have saved your details successfully.');
    } catch (error: any) {
      Alert.alert('Submission failed', error?.message || 'Unable to submit registration. Please try again later.');
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
    }, 4000);

    return () => clearTimeout(timeout);
  }, [confirmationMessage]);

  return (
    <View style={[styles.card, compact && styles.cardCompact]}>
      <Text style={[styles.title, compact && styles.titleCompact]}>Secure your seat</Text>
      <Text style={[styles.subtitle, compact && styles.subtitleCompact]}>June 14 • 3PM–7:30PM • Live event</Text>

      {confirmationMessage ? (
        <View style={styles.confirmationBanner}>
          <Text style={styles.confirmationText}>{confirmationMessage}</Text>
        </View>
      ) : null}

      <TextInput
        value={name}
        onChangeText={(text: string) => {
          clearConfirmation();
          setName(text);
        }}
        placeholder="Full name"
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, compact && styles.inputCompact]}
      />
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone number"
        placeholderTextColor={colors.textSecondary}
        keyboardType="phone-pad"
        style={[styles.input, compact && styles.inputCompact]}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email address"
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
        <Text style={[styles.checkboxLabel, compact && styles.checkboxLabelCompact]}>I agree to receive event updates via email.</Text>
      </Pressable>

      <Pressable style={[styles.submitButton, compact && styles.submitButtonCompact]} onPress={handleSubmit} accessibilityLabel="Submit registration" disabled={isSubmitting}>
        {isSubmitting ? (
          <ActivityIndicator color={colors.textPrimary} />
        ) : (
          <Text style={[styles.submitText, compact && styles.submitTextCompact]}>Register now</Text>
        )}
      </Pressable>

      <Text style={[styles.note, compact && styles.noteCompact]}>Registration saves responses to Google Sheets for follow-up.</Text>
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
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompact: {
    width: 18,
    height: 18,
    marginRight: spacing.sm,
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
    color: colors.textSecondary,
    fontSize: typography.small,
    flex: 1,
  },
  checkboxLabelCompact: {
    fontSize: 12,
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
});

export default RegistrationForm;
