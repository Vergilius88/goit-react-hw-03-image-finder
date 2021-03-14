export default function fetchGallery(keyword, page) {
  const key = "18814496-71c3543716fd26683f05f95a8";
  return fetch(
    `https://pixabay.com/api/?q=${keyword}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((res) => res.json());
}
