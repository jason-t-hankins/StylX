import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const starImage = require("../../assets/figma/Type=Star.png");

const QUIZ_IMAGES = {
  round1: [
    { id: 0, image: require("../../assets/figma/emo1.png"), style: "emo" },
    { id: 1, image: require("../../assets/figma/fae1.png"), style: "darkFae" },
    { id: 2, image: require("../../assets/figma/fashion1.png"), style: "streetFashion" },
    { id: 3, image: starImage, style: null, clickable: false },
  ],
  round2: [
    { id: 0, image: require("../../assets/figma/fashion2.png"), style: "streetFashion" },
    { id: 1, image: require("../../assets/figma/emo2.png"), style: "emo" },
    { id: 2, image: require("../../assets/figma/fae2.png"), style: "darkFae" },
    { id: 3, image: starImage, style: null, clickable: false },
  ],
  round3: [
    { id: 0, image: require("../../assets/figma/fae3.png"), style: "darkFae" },
    { id: 1, image: require("../../assets/figma/fashion3.png"), style: "streetFashion" },
    { id: 2, image: require("../../assets/figma/emo3.png"), style: "emo" },
    { id: 3, image: starImage, style: null, clickable: false },
  ],
};

const STYLE_RESULTS = {
  darkFae: {
    name: "dark fae",
    subtitle: "An aesthetic comprised of lace, dark hues, and whimsy",
    description:
      "This is a deeper, more mysterious take on an ethereal style. This look blends soft, flowing, elements like lace and delicate textures with darker tones and edgier details.\n\nYour style balances lightness and intensity. It's whimsical, but not overly soft. There's a quiet drama to it that stands out without being loud.",
  },
  streetFashion: {
    name: "street fashion",
    subtitle: "Urban energy mixed with contemporary style and attitude",
    description:
      "Street fashion is all about bold self-expression and comfort meeting edge. This aesthetic combines casual, relaxed pieces with statement accessories and confident styling.\n\nYour style is versatile and modern. You're not afraid to mix high and low, and you value comfort without sacrificing impact. You stand out through personality and authenticity.",
  },
  emo: {
    name: "emo",
    subtitle: "Emotional depth expressed through dark, alternative style",
    description:
      "Emo style is a powerful blend of alternative fashion with deep emotional expression. Think dark colors, graphic tees, and distinctive silhouettes that tell a story.\n\nYour style is introspective and artistic. You use fashion as a form of self-expression and connection. There's authenticity in your choices, and you're drawn to pieces that have meaning and personality.",
  },
};

export default function StyleQuiz() {
  const router = useRouter();
  const [currentRound, setCurrentRound] = React.useState(0);
  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);
  const [scores, setScores] = React.useState({
    darkFae: 0,
    streetFashion: 0,
    emo: 0,
  });
  const [resultStyle, setResultStyle] = React.useState<keyof typeof STYLE_RESULTS>("darkFae");

  const handleSelectImage = (index: number, style: string | null) => {
    if (!style) return; // Can't click non-clickable images (star)

    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
      // Remove score when deselected
      setScores((prev) => ({
        ...prev,
        [style]: Math.max(0, prev[style as keyof typeof scores] - 1),
      }));
    } else if (selectedItems.length < 2) {
      setSelectedItems([...selectedItems, index]);
      // Add score when selected
      setScores((prev) => ({
        ...prev,
        [style]: prev[style as keyof typeof scores] + 1,
      }));
    }
  };

  const handleNextQuiz = () => {
    if (currentRound === 0) {
      // Intro to quiz round 1
      setCurrentRound(1);
      setSelectedItems([]);
    } else if (currentRound < 3) {
      // Quiz round to next quiz round
      setCurrentRound(currentRound + 1);
      setSelectedItems([]);
    } else if (currentRound === 3) {
      // Last quiz round to finding style
      setCurrentRound(4);
    } else if (currentRound === 4) {
      // Finding style to results - calculate winner
      const winner = Object.entries(scores).reduce((a, b) =>
        b[1] > a[1] ? b : a
      )[0] as keyof typeof STYLE_RESULTS;
      setResultStyle(winner);
      setCurrentRound(5);
    } else if (currentRound === 5) {
      // Results to homescreen
      router.push("/homescreen");
    }
  };

  const handleBackQuiz = () => {
    if (currentRound === 0) {
      router.back();
    } else if (currentRound === 5) {
      setCurrentRound(4);
    } else if (currentRound === 4) {
      setCurrentRound(3);
      setSelectedItems([]);
    } else {
      setCurrentRound(currentRound - 1);
      setSelectedItems([]);
    }
  };

  const handleRedoQuiz = () => {
    setCurrentRound(0);
    setSelectedItems([]);
    setScores({ darkFae: 0, streetFashion: 0, emo: 0 });
  };

  const isQuizRound = currentRound >= 1 && currentRound <= 3;
  const isFindingStyle = currentRound === 4;
  const isResults = currentRound === 5;

  return (
    <LinearGradient
      style={styles.container}
      colors={["#fff", "#b9dcf9", "#fff"]}
      locations={[0.21, 0.49, 0.85]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {currentRound === 0 && (
        <>
          <View style={styles.content}>
            <View style={styles.starsTop}>
              <View style={styles.starLeft}>
                <Image
                  source={starImage}
                  style={styles.star}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.starRight}>
                <Image
                  source={starImage}
                  style={styles.star}
                  resizeMode="contain"
                />
              </View>
            </View>

            <Text style={styles.heading}>Let's Find Your Style!</Text>

            <View style={styles.starsBottom}>
              <View style={styles.starLeft}>
                <Image
                  source={starImage}
                  style={styles.star}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.starRight}>
                <Image
                  source={starImage}
                  style={styles.star}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => router.back()}
            >
              <Text style={styles.buttonText}>Back</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={handleNextQuiz}
            >
              <Text style={styles.buttonText}>Next</Text>
            </Pressable>
          </View>
        </>
      )}

      {isQuizRound && (
        <>
          <View style={styles.quizContent}>
            <View style={styles.textSection}>
              <Text style={styles.quizHeading}>Which images are{'\n'}you drawn to?</Text>
              <Text style={styles.selectText}>Select 2</Text>
            </View>

            <View style={styles.gridContainer}>
              <View style={styles.row}>
                {QUIZ_IMAGES[`round${currentRound}` as keyof typeof QUIZ_IMAGES].slice(0, 2).map((img) => (
                  <Pressable
                    key={img.id}
                    style={[
                      styles.imageWrapper,
                      selectedItems.includes(img.id) && styles.imageWrapperSelected,
                      img.clickable === false && styles.imageWrapperNonClickable,
                    ]}
                    onPress={() => img.clickable !== false && handleSelectImage(img.id, img.style)}
                    disabled={img.clickable === false}
                  >
                    <Image
                      source={img.image}
                      style={styles.gridImage}
                      resizeMode="cover"
                    />
                    {selectedItems.includes(img.id) && (
                      <View style={styles.selectedOverlay} />
                    )}
                  </Pressable>
                ))}
              </View>
              <View style={styles.row}>
                {QUIZ_IMAGES[`round${currentRound}` as keyof typeof QUIZ_IMAGES].slice(2, 4).map((img) => (
                  <Pressable
                    key={img.id}
                    style={[
                      styles.imageWrapper,
                      selectedItems.includes(img.id) && styles.imageWrapperSelected,
                      img.clickable === false && styles.imageWrapperNonClickable,
                    ]}
                    onPress={() => img.clickable !== false && handleSelectImage(img.id, img.style)}
                    disabled={img.clickable === false}
                  >
                    <Image
                      source={img.image}
                      style={styles.gridImage}
                      resizeMode="cover"
                    />
                    {selectedItems.includes(img.id) && (
                      <View style={styles.selectedOverlay} />
                    )}
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={handleBackQuiz}
            >
              <Text style={styles.buttonText}>Back</Text>
            </Pressable>
            <Pressable
              style={[styles.button, !selectedItems.length && styles.buttonDisabled]}
              onPress={handleNextQuiz}
              disabled={selectedItems.length !== 2}
            >
              <Text style={styles.buttonText}>Next</Text>
            </Pressable>
          </View>
        </>
      )}

      {isFindingStyle && (
        <>
          <View style={styles.content}>
            <View style={styles.starsTop}>
              <View style={styles.starLeft}>
                <Image
                  source={starImage}
                  style={styles.star}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.starRight}>
                <Image
                  source={starImage}
                  style={styles.star}
                  resizeMode="contain"
                />
              </View>
            </View>

            <Text style={styles.heading}>Finding Your Style!</Text>

            <View style={styles.starsBottom}>
              <View style={styles.starLeft}>
                <Image
                  source={starImage}
                  style={styles.star}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.starRight}>
                <Image
                  source={starImage}
                  style={styles.star}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={handleBackQuiz}
            >
              <Text style={styles.buttonText}>Back</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={handleNextQuiz}
            >
              <Text style={styles.buttonText}>Next</Text>
            </Pressable>
          </View>
        </>
      )}

      {isResults && (
        <>
          <ScrollView
            style={styles.resultsContainer}
            contentContainerStyle={styles.resultsContent}
          >
            <View style={styles.resultText}>
              <Text style={styles.resultHeading}>
                you got{"\n"}
                {STYLE_RESULTS[resultStyle].name}!
              </Text>
              <Text style={styles.resultSubtitle}>
                {STYLE_RESULTS[resultStyle].subtitle}
              </Text>
            </View>

            <Image
              source={starImage}
              style={styles.resultImage}
              resizeMode="cover"
            />

            <View style={styles.resultDescription}>
              <Text style={styles.resultDescriptionText}>
                {STYLE_RESULTS[resultStyle].description}
              </Text>
            </View>
          </ScrollView>

          <View style={styles.resultButtonContainer}>
            <Pressable
              style={styles.button}
              onPress={handleRedoQuiz}
            >
              <Text style={styles.buttonText}>Redo Quiz</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={handleNextQuiz}
            >
              <Text style={styles.buttonText}>Next</Text>
            </Pressable>
          </View>
        </>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    width: "100%",
    overflow: "hidden",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  content: {
    flex: 1,
    gap: 60,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  quizContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    paddingHorizontal: 20,
  },
  textSection: {
    gap: 10,
    alignItems: "center",
  },
  quizHeading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#03118e",
    textAlign: "center",
    lineHeight: 32,
  },
  selectText: {
    fontSize: 14,
    color: "#656565",
    textAlign: "center",
  },
  gridContainer: {
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  imageWrapper: {
    width: 160,
    height: 160,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "transparent",
  },
  imageWrapperSelected: {
    borderColor: "#0d5fd6",
    borderWidth: 4,
  },
  imageWrapperNonClickable: {
    opacity: 0.6,
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
  selectedOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(13, 95, 214, 0.2)",
  },
  starsTop: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  starsBottom: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  starLeft: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  starRight: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  star: {
    width: 40,
    height: 40,
  },
  heading: {
    fontSize: 45,
    fontWeight: "700",
    color: "#03118e",
    textAlign: "center",
    letterSpacing: -0.5,
    lineHeight: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    width: "100%",
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#0d5fd6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    color: "#0d5fd6",
    fontWeight: "500",
    textAlign: "center",
  },
  resultsContainer: {
    flex: 1,
    width: "100%",
  },
  resultsContent: {
    gap: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  resultText: {
    gap: 16,
    alignItems: "center",
    width: "100%",
  },
  resultHeading: {
    fontSize: 45,
    fontWeight: "700",
    color: "#03118e",
    textAlign: "center",
    textTransform: "uppercase",
    lineHeight: 50,
  },
  resultSubtitle: {
    fontSize: 14,
    color: "#656565",
    textAlign: "center",
    lineHeight: 20,
  },
  resultImage: {
    width: "100%",
    height: 280,
    borderRadius: 12,
  },
  resultDescription: {
    width: "100%",
  },
  resultDescriptionText: {
    fontSize: 14,
    color: "#656565",
    lineHeight: 20,
    textAlign: "left",
  },
  resultButtonContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 20,
    width: "100%",
  },
});
