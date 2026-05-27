import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../styles/theme';

type FloatingButtonProps = {
  onPress: () => void;
  visible?: boolean;
};

const FloatingButton = ({ onPress, visible = false }: FloatingButtonProps) => {
  if (!visible) {
    return null;
  }

  return (
    <Pressable style={styles.button} onPress={onPress} accessibilityLabel="Back to registration">
      <Text style={styles.buttonText}>Register</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.xl,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 999,
    shadowColor: colors.primary,
    shadowOpacity: 0.22,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  } as ViewStyle,
  buttonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default FloatingButton;
