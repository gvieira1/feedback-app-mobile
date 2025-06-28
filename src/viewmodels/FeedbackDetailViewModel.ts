// src/viewmodels/FeedbackDetailViewModel.ts
import { Feedback } from '../models/Feedback';

export const useFeedbackDetailViewModel = (feedback: Feedback) => {
  return {
    ...feedback,
    formattedDate: new Date(feedback.createdAt).toLocaleDateString(),
    formattedTime: new Date(feedback.createdAt).toLocaleTimeString(),
  };
};
