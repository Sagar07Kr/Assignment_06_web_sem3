import api from './clientApi';

const courseApi = {
  getCourses: () => api.get('/courses'),
  getCourseById: (id) => api.get(`/courses/${id}`),
};

export default courseApi;