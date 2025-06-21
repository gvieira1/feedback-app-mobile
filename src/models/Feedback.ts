export type FeedbackType = 'ELOGIO' | 'SUGESTAO' | 'CRITICA' | 'RECLAMACAO'; 

export interface Feedback {
  id: number;
  titulo: string;
  content: string;
  sector: string;
  type: FeedbackType;
  anonymous: boolean;
  createdAt: string;   // ISO datetime string (LocalDateTime é serializado assim)
  tags: string[];
  authorName: string;
}
