function generateRoomKey() {
  const min = 1000000;
  const max = 9999999;
  return Math.floor(min + Math.random() * (max - min + 1));
}
  
export default generateRoomKey;
  