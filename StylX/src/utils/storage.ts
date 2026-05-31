import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface QuizResult {
  style: "darkFae" | "streetFashion" | "emo";
  completedAt: string;
  scores: {
    darkFae: number;
    streetFashion: number;
    emo: number;
  };
}

export interface ClosetItem {
  id: string;
  image: string; // URI string for uploaded images
  name: string;
}

export interface LikedImage {
  id: string;
  imageKey: string; // e.g., "emo1", "fae2", "fashion3"
  style: "darkFae" | "streetFashion" | "emo";
  likedAt: string;
}

export interface HomeSwipeState {
  currentIndex: number;
  likedImages: LikedImage[];
}

const USER_STORAGE_KEY = "@stylx_user";
const QUIZ_STORAGE_KEY = "@stylx_quiz";
const CLOSET_STORAGE_KEY = "@stylx_closet";
const LIKES_STORAGE_KEY = "@stylx_likes";
const HOME_SWIPE_STATE_KEY = "@stylx_home_swipe_state";

// User Data Functions
export const saveUserData = async (userData: UserData): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error("Failed to save user data:", error);
  }
};

export const getUserData = async (): Promise<UserData | null> => {
  try {
    const data = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to retrieve user data:", error);
    return null;
  }
};

// Quiz Result Functions
export const saveQuizResult = async (result: QuizResult): Promise<void> => {
  try {
    await AsyncStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(result));
  } catch (error) {
    console.error("Failed to save quiz result:", error);
  }
};

export const getQuizResult = async (): Promise<QuizResult | null> => {
  try {
    const data = await AsyncStorage.getItem(QUIZ_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to retrieve quiz result:", error);
    return null;
  }
};

// Liked Images Functions
export const saveLikedImages = async (images: LikedImage[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(images));
  } catch (error) {
    console.error("Failed to save liked images:", error);
  }
};

export const getLikedImages = async (): Promise<LikedImage[]> => {
  try {
    const data = await AsyncStorage.getItem(LIKES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to retrieve liked images:", error);
    return [];
  }
};

export const addLikedImage = async (image: LikedImage): Promise<void> => {
  try {
    const images = await getLikedImages();
    images.push(image);
    await saveLikedImages(images);
  } catch (error) {
    console.error("Failed to add liked image:", error);
  }
};

export const saveHomeSwipeState = async (state: HomeSwipeState): Promise<void> => {
  try {
    await AsyncStorage.setItem(HOME_SWIPE_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save home swipe state:", error);
  }
};

export const getHomeSwipeState = async (): Promise<HomeSwipeState | null> => {
  try {
    const data = await AsyncStorage.getItem(HOME_SWIPE_STATE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to retrieve home swipe state:", error);
    return null;
  }
};

export const clearHomeSwipeState = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(HOME_SWIPE_STATE_KEY);
  } catch (error) {
    console.error("Failed to clear home swipe state:", error);
  }
};

// Clear All Data (for testing/debugging)
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    await AsyncStorage.removeItem(QUIZ_STORAGE_KEY);
    await AsyncStorage.removeItem(CLOSET_STORAGE_KEY);
    await AsyncStorage.removeItem(LIKES_STORAGE_KEY);
    await AsyncStorage.removeItem(HOME_SWIPE_STATE_KEY);
    console.log("All data cleared");
  } catch (error) {
    console.error("Failed to clear data:", error);
  }
};

// Closet Items Functions
export const saveClosetItems = async (items: ClosetItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(CLOSET_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save closet items:", error);
  }
};

export const getClosetItems = async (): Promise<ClosetItem[]> => {
  try {
    const data = await AsyncStorage.getItem(CLOSET_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to retrieve closet items:", error);
    return [];
  }
};

export const addClosetItem = async (item: ClosetItem): Promise<void> => {
  try {
    const items = await getClosetItems();
    items.push(item);
    await saveClosetItems(items);
  } catch (error) {
    console.error("Failed to add closet item:", error);
  }
};

// Get All Data (for debugging)
export const getAllData = async (): Promise<{
  user: UserData | null;
  quiz: QuizResult | null;
  closet: ClosetItem[];
  likes: LikedImage[];
  homeSwipeState: HomeSwipeState | null;
}> => {
  try {
    const user = await getUserData();
    const quiz = await getQuizResult();
    const closet = await getClosetItems();
    const likes = await getLikedImages();
    const homeSwipeState = await getHomeSwipeState();
    return { user, quiz, closet, likes, homeSwipeState };
  } catch (error) {
    console.error("Failed to retrieve all data:", error);
    return { user: null, quiz: null, closet: [], likes: [], homeSwipeState: null };
  }
};
