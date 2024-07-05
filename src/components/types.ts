export interface Props {
  id: string;
  title: string;
  image: string;
  url: string;
  author: string;
  description: string;
  category: string[];
  createdAt: Date;
}
export interface Propsing {
  id: string;
  title: string;
  image: string;
  url: string;
  author: string;
  description: string;
  category: string[];
  createdAt: Date;
}[]

export interface Data{
  data : Props[]
  title? : string
  categorys? : string[]
}

export type UserProfile = {
  createdAt: string; // Tanggal dan waktu dibuat
  email: string; // Alamat email pengguna
  emailVerified: string | null; // Status verifikasi email (mungkin null jika belum diverifikasi)
  hashedPassword: string; // Password terenkripsi (hashed)
  id: string; // ID unik pengguna
  image: string | null; // URL gambar profil (mungkin null jika tidak ada)
  name: string; // Nama lengkap pengguna
  updatedAt: string; // Tanggal dan waktu terakhir diperbarui
};



export const FilteredArticles = ({ data  }: Data) => {
  const filteredData = data.filter((item) => {
    return (
      item.author &&
      item.description &&
      item.title &&
      item.url &&
      item.image
    );
  });


  return filteredData
};
