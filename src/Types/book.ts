export type BookListItem = {
  id: string;
  title: string;
  imageUrl: string;
  year?: string;
  authors?: string[];
  rating?: number;
  loggedAt?: string;
};

export type OpenLibraryWork = {
  key: string;
  title: string;
  cover_id?: number;
  first_publish_year?: number;
  rating?: {
    average: number;
  };
  author_names?: string[];
  author_name?: string[];
};

export type OpenLibraryEntry = {
  work?: OpenLibraryWork;
  logged_date?: string;
};

export type OpenLibraryListResponse = {
  reading_log_entries?: OpenLibraryEntry[];
};

export type OpenLibraryDescription =
  | string
  | {
      value?: string;
    };

export type BookDetail = {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  subjects: string[];
  firstPublishYear?: number;
};

export type OpenLibraryWorkDetail = {
  key: string;
  title: string;
  description?: OpenLibraryDescription;
  covers?: number[];
  subjects?: string[];
  first_publish_year?: number;
};
