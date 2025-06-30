// src/components/PrimaryButton.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { primaryButtonStyles as styles } from './styles/PrimaryButton.styles';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  buttonStyle,
  textStyle,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
