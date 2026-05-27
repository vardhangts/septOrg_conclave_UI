import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { spacing, colors } from '../styles/theme';

const { width, height: windowHeight } = Dimensions.get('window');

type ImageSource = any;

const defaultImages: ImageSource[] = [
  require('../assets/image1.jpeg'),
  require('../assets/image2.jpeg'),
  require('../assets/image3.jpeg'),
  require('../assets/image4.jpeg'),
];

interface Props {
  images?: ImageSource[];
  intervalMs?: number;
}

interface Props {
  images?: ImageSource[];
  intervalMs?: number;
  height?: number;
}

const ImageCarousel: React.FC<Props> = ({ images = defaultImages, intervalMs = 3000, height }) => {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [images.length, intervalMs]);

  const containerHeight = height ?? Math.min(windowHeight * 0.9, 812);

  return (
    <View style={[styles.container, { height: containerHeight }]}>
      <Image source={images[index]} style={styles.image} resizeMode="contain" />
      <View style={styles.dots}>
        {images.map((_, i) => (
          <TouchableOpacity key={i} onPress={() => setIndex(i)} style={styles.dotWrapper}>
            <View style={[styles.dot, i === index && styles.dotActive]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 260,
    marginBottom: spacing.lg,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  dots: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dotWrapper: {
    paddingHorizontal: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    backgroundColor: 'white',
    width: 12,
    height: 8,
    borderRadius: 4,
  },
});

export default ImageCarousel;
