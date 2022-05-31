import * as ScreenOrientation from "expo-screen-orientation";

export default async (orientation) => {
  const ori = ScreenOrientation.OrientationLock[orientation];
  await ScreenOrientation.lockAsync(ori);
};
