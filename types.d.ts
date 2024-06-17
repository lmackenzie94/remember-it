import type { Tables } from './supabase';

export type Question = Tables<'questions'>;
export type Profile = Tables<'profiles'>;

export type QuestionWithProfile = Question & {
  profiles: Profile;
};
