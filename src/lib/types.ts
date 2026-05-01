export interface DiagnosisFormData {
  sns: string[];
  frequency: string;
  followers: string;
  hasProduct: string;
  salesStatus: string;
  biggestProblem: string;
  hasFunnel: string;
  timeAvailable: string;
  interestedInAutomation: string;
  nickname: string;
}

export interface DiagnosisData {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
}

export interface DiagnosisResult {
  type: string;
  cause: string;
  advice: string;
  next_step: string;
  automation_pitch: string;
  line_cta: string;
}
