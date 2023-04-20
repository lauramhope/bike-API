export default class BikeIndex {
  // static async searchByColor(color) {
  //   try {
  //     const response = await fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&serial=1&colors=${color}&stolenness=all`);
  //     const jsonifiedResponse = await response.json();
  //     if (!response.ok) {
  //       const errorMessage = `${response.status} ${response.statusText}
  //       ${jsonifiedResponse.message}`;
  //       throw new Error(errorMessage);
  //     }
  //     return jsonifiedResponse;
  //   } catch(error) {
  //     return error;
  //   }
  // }

  // static async searchByStolenness(stolen) {
  //   try {
  //     const response = await fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&stolenness=${stolen}`);
  //     const jsonifiedResponse = await response.json();
  //     if (!response.ok) {
  //       const errorMessage = `${response.status} ${response.statusText}
  //       ${jsonifiedResponse.message}`;
  //       throw new Error(errorMessage);
  //     }
  //     return jsonifiedResponse;
  //   } catch(error) {
  //     return error;
  //   }
  // }

  // static async searchByLocation(city) {
  //   try {
  //     const response = await fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&serial=1&location=${city}&stolenness=all`);
  //     const jsonifiedResponse = await response.json();
  //     if (!response.ok) {
  //       const errorMessage = `${response.status} ${response.statusText}
  //       ${jsonifiedResponse.message}`;
  //       throw new Error(errorMessage);
  //     }
  //     return jsonifiedResponse;
  //   } catch(error) {
  //     return error;
  //   }
  // }

  static async searchByUserSelection(color, stolen, city) {
    let urlString = `https://bikeindex.org:443/api/v3/search?page=1&per_page=25`;
    if (color != undefined) {
      urlString = urlString + `&colors=${color}`;
    }
    if (stolen != undefined) {
      urlString = urlString.concat(`&stolenness=${stolen}`);
    }
    if (city != undefined) {
      urlString = urlString.concat(`&location=${city}`);
    }
    try {
      const response = await fetch(urlString);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }

  static async displayFurtherResults(color, stolen, city, page) {
    let urlString = `https://bikeindex.org:443/api/v3/search?page=${page}&per_page=25`;
    if (color != undefined) {
      urlString = urlString + `&colors=${color}`;
    }
    if (stolen != undefined) {
      urlString = urlString.concat(`&stolenness=${stolen}`);
    }
    if (city != undefined) {
      urlString = urlString.concat(`&location=${city}`);
    }
    try {
      const response = await fetch(urlString);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }

  static async getManufacturerInfo(city) {
    let urlString = `https://bikeindex.org:443/api/v3/search?page=1&per_page=100&stolenness=proximity`;
    if (city != undefined) {
      urlString = urlString.concat(`&location=${city}`);
    }
    try {
      const response = await fetch(urlString);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}
        ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
} 