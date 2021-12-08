const arrMovies = [
  {
    "id": 1,
    "nameRU": "«Роллинг Стоунз» в изгнании",
    "nameEN": "Stones in Exile",
    "director": "Стивен Кайак ",
    "country": "США",
    "year": "2010",
    "duration": 61,
    "description": "В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты и сверхуспешные концертные туры, была разорена. Виной всему — бездарный менеджмент и драконовское налогообложение в Британии. Тогда музыканты приняли не самое простое для себя решение: летом 1971 года после выхода альбома «Stiсky Fingers» они отправились на юг Франции записывать новую пластинку. Именно там, на Лазурном Берегу, в арендованном Китом Ричардсом подвале виллы Неллькот родился сборник «Exile on Main St.», который стал лучшим альбомом легендарной группы.",
    "trailerLink": "https://www.youtube.com/watch?v=UXcqcdYABFw",
    "created_at": "2020-11-23T14:12:21.376Z",
    "updated_at": "2020-11-23T14:12:21.376Z",
    "image": {
      "id": 1,
      "name": "stones-in-exile",
      "alternativeText": "",
      "caption": "",
      "width": 512,
      "height": 279,
      "formats": {
        "thumbnail": {
          "hash": "thumbnail_stones_in_exile_b2f1b8f4b7",
          "ext": ".jpeg",
          "mime": "image/jpeg",
          "width": 245,
          "height": 134,
          "size": 8.79,
          "path": null,
          "url": "/uploads/thumbnail_stones_in_exile_b2f1b8f4b7.jpeg"
        },
        "small": {
          "hash": "small_stones_in_exile_b2f1b8f4b7",
          "ext": ".jpeg",
          "mime": "image/jpeg",
          "width": 500,
          "height": 272,
          "size": 25.68,
          "path": null,
          "url": "/uploads/small_stones_in_exile_b2f1b8f4b7.jpeg"
        }
      },
      "hash": "stones_in_exile_b2f1b8f4b7",
      "ext": ".jpeg",
      "mime": "image/jpeg",
      "size": 25.53,
      "url": "/uploads/stones_in_exile_b2f1b8f4b7.jpeg",
      "previewUrl": null,
      "provider": "local",
      "provider_metadata": null,
      "created_at": "2020-11-23T14:11:57.313Z",
      "updated_at": "2020-11-23T14:11:57.313Z"
    }
  }
]

export interface ICard {
  id: number;
  nameRU: string,
  duration: number,
  trailerLink: string,
  image: {
    url: string
  }
}

export const initialCards: ICard[] = [
  {
    id: 1,
    nameRU: "Роллинг Стоунз» в изгнании",
    duration: 61,
    trailerLink: "https://www.youtube.com/watch?v=UXcqcdYABFw",
    image: {
      url: "https://api.nomoreparties.co/uploads/stones_in_exile_b2f1b8f4b7.jpeg"
    }
  },
  {
    id: 2,
    nameRU: "Marsli",
    duration: 80,
    trailerLink: "https://www.youtube.com/watch?v=JMZ8DO9F4Mo",
    image: {
      url: "https://www.kinogallery.com/images/the-martian2016/kinogallery.com-the-martian2016-0513164001444285815.jpg"
    }
  },
  {
    id: 3,
    nameRU: "Без обратного пути",
    duration: 104,
    trailerLink: "https://www.youtube.com/watch?v=6iYxdghpJZY",
    image: {
      url: "https://api.nomoreparties.co/uploads/blur_a43fcf463d.jpeg"
    }
  },
  {
    id: 4,
    nameRU: "Фавела на взрыве",
    duration: 80,
    trailerLink: "https://www.youtube.com/watch?v=Cugdwa7mndA",
    image: {
      url: "https://api.nomoreparties.co/uploads/881707734_640_d6a3a43358.jpeg"
    }
  },
  {
    id: 5,
    nameRU: "Постеры, сошедшие со стен",
    duration: 32,
    trailerLink: "https://www.youtube.com/watch?v=VFMU3crg0sM",
    image: {
      url: "https://api.nomoreparties.co/uploads/posters_came_from_the_walls_2009_001_posters_180fe1a19f.jpeg"
    }
  },
  {
    id: 6,
    nameRU: "Soul Power",
    duration: 92,
    trailerLink: "https://www.youtube.com/watch?v=8OprNgiOq-I",
    image: {
      url: "https://api.nomoreparties.co/uploads/images_5bfcbf36e6.jpeg"
    }
  },
  {
    id: 7,
    nameRU: "196 ударов в минуту",
    duration: 60,
    trailerLink: "https://www.youtube.com/watch?v=GsDRVpdgNJ4",
    image: {
      url: "https://api.nomoreparties.co/uploads/zagruzhennoe_1_fd5faff237.jpeg"
    }
  },
  {
    id: 8,
    nameRU: "Баллада о Дженезисе и Леди Джей",
    duration: 65,
    trailerLink: "https://www.youtube.com/watch?v=d8BX2FDrogo",
    image: {
      url: "https://api.nomoreparties.co/uploads/ballad_of_genesis_and_lady_jaye_10c27afa96.jpeg"
    }
  },
  {
    id: 9,
    nameRU: "Виллалобос",
    duration: 110,
    trailerLink: "https://www.kinopoisk.ru/film/586534/video/56500/",
    image: {
      url: "https://api.nomoreparties.co/uploads/590x400_2eccd40a93.jpeg"
    }
  },
  {
    id: 10,
    nameRU: "Роллинг Стоунз» в изгнании",
    duration: 61,
    trailerLink: "https://www.youtube.com/watch?v=UXcqcdYABFw",
    image: {
      url: "https://api.nomoreparties.co/uploads/stones_in_exile_b2f1b8f4b7.jpeg"
    }
  },
  {
    id: 11,
    nameRU: "Marsli",
    duration: 80,
    trailerLink: "https://www.youtube.com/watch?v=JMZ8DO9F4Mo",
    image: {
      url: "https://www.kinogallery.com/images/the-martian2016/kinogallery.com-the-martian2016-0513164001444285815.jpg"
    }
  },
  {
    id: 12,
    nameRU: "Без обратного пути",
    duration: 104,
    trailerLink: "https://www.youtube.com/watch?v=6iYxdghpJZY",
    image: {
      url: "https://api.nomoreparties.co/uploads/blur_a43fcf463d.jpeg"
    }
  },
  {
    id: 13,
    nameRU: "Фавела на взрыве",
    duration: 80,
    trailerLink: "https://www.youtube.com/watch?v=Cugdwa7mndA",
    image: {
      url: "https://api.nomoreparties.co/uploads/881707734_640_d6a3a43358.jpeg"
    }
  },
  {
    id: 14,
    nameRU: "Постеры, сошедшие со стен",
    duration: 32,
    trailerLink: "https://www.youtube.com/watch?v=VFMU3crg0sM",
    image: {
      url: "https://api.nomoreparties.co/uploads/posters_came_from_the_walls_2009_001_posters_180fe1a19f.jpeg"
    }
  },
  {
    id: 15,
    nameRU: "Soul Power",
    duration: 92,
    trailerLink: "https://www.youtube.com/watch?v=8OprNgiOq-I",
    image: {
      url: "https://api.nomoreparties.co/uploads/images_5bfcbf36e6.jpeg"
    }
  },
  {
    id: 16,
    nameRU: "196 ударов в минуту",
    duration: 60,
    trailerLink: "https://www.youtube.com/watch?v=GsDRVpdgNJ4",
    image: {
      url: "https://api.nomoreparties.co/uploads/zagruzhennoe_1_fd5faff237.jpeg"
    }
  },
  {
    id: 17,
    nameRU: "Баллада о Дженезисе и Леди Джей",
    duration: 65,
    trailerLink: "https://www.youtube.com/watch?v=d8BX2FDrogo",
    image: {
      url: "https://api.nomoreparties.co/uploads/ballad_of_genesis_and_lady_jaye_10c27afa96.jpeg"
    }
  },
]
