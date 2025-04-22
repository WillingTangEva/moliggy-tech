/**
 * 平滑滚动到指定ID的元素
 * @param elementId 目标元素的ID
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
