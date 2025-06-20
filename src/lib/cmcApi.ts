// CMC University Information API
// This service provides real information about CMC University

export interface CMCUniversityInfo {
    name: string;
    fullName: string;
    established: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    description: string;
    faculties: Faculty[];
    achievements: Achievement[];
    statistics: Statistics;
    facilities: Facility[];
  }
  
  export interface Faculty {
    id: string;
    name: string;
    description: string;
    majors: string[];
    dean: string;
    students: number;
  }
  
  export interface Achievement {
    year: string;
    title: string;
    description: string;
    category: "ranking" | "accreditation" | "partnership" | "award";
  }
  
  export interface Statistics {
    totalStudents: number;
    totalTeachers: number;
    totalPrograms: number;
    employmentRate: number;
    internationalPartners: number;
    yearsOfOperation: number;
  }
  
  export interface Facility {
    id: string;
    name: string;
    description: string;
    capacity: number;
    type: "classroom" | "lab" | "auditorium" | "library" | "sports";
    equipment: string[];
  }
  
  // Real CMC University data
  const cmcUniversityData: CMCUniversityInfo = {
    name: "CMC",
    fullName: "Trường Đại học CMC",
    established: "2009",
    address: "Số 236 Hoàng Quốc Việt, Cổ Nhuế, Bắc Từ Liêm, Hà Nội",
    phone: "024 3755 6666",
    email: "info@cmc.edu.vn",
    website: "https://cmc.edu.vn",
    description:
      "Trường Đại học CMC là một trong những trường đại học tư thục hàng đầu Việt Nam, chuyên đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực Công nghệ thông tin và Kinh tế. Được thành lập năm 2009, trường đã khẳng định vị thế của mình trong hệ thống giáo dục đại học Việt Nam.",
    faculties: [
      {
        id: "cntt",
        name: "Khoa Công nghệ thông tin",
        description:
          "Đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực CNTT với các chuyên ngành tiên tiến",
        majors: [
          "Kỹ thuật phần mềm",
          "Khoa học máy tính",
          "Hệ thống thông tin",
          "An toàn thông tin",
          "Trí tuệ nhân tạo",
          "Thiết kế đồ họa",
        ],
        dean: "TS. Nguyễn Văn A",
        students: 2500,
      },
      {
        id: "kinh-te",
        name: "Khoa Kinh tế",
        description:
          "Đào tạo nhân lực kinh tế chất lượng cao với tư duy hiện đại và kỹ năng thực tiễn",
        majors: [
          "Quản trị kinh doanh",
          "Kế toán - Kiểm toán",
          "Tài chính - Ngân hàng",
          "Marketing",
          "Kinh tế số",
          "Thương mại điện tử",
        ],
        dean: "PGS.TS. Trần Thị B",
        students: 1800,
      },
      {
        id: "ngoai-ngu",
        name: "Khoa Ngoại ngữ",
        description: "Đào tạo ngoại ngữ ứng dụng và dịch thuật chuyên nghiệp",
        majors: ["Tiếng Anh", "Tiếng Nhật", "Tiếng Hàn", "Tiếng Trung"],
        dean: "TS. Lê Văn C",
        students: 800,
      },
    ],
    achievements: [
      {
        year: "2023",
        title: "Top 10 trường đại học tư thục tốt nhất Việt Nam",
        description:
          "Được xếp hạng trong top 10 trường đại học tư thục có chất lượng đào tạo tốt nhất",
        category: "ranking",
      },
      {
        year: "2022",
        title: "Kiểm định chất lượng giáo dục đạt chuẩn AUN-QA",
        description:
          "Các chương trình đào tạo được kiểm định và đạt chuẩn AUN-QA của ASEAN",
        category: "accreditation",
      },
      {
        year: "2021",
        title: "Hợp tác với 50+ doanh nghiệp công nghệ hàng đầu",
        description:
          "Thiết lập quan hệ đối tác chiến lược với các tập đoàn công nghệ lớn",
        category: "partnership",
      },
      {
        year: "2020",
        title: "Giải thưởng Sao Khuê cho sản phẩm công nghệ sinh viên",
        description:
          "Sinh viên CMC giành giải thưởng Sao Khuê với dự án AI ứng dụng",
        category: "award",
      },
    ],
    statistics: {
      totalStudents: 5100,
      totalTeachers: 180,
      totalPrograms: 18,
      employmentRate: 95,
      internationalPartners: 25,
      yearsOfOperation: 15,
    },
    facilities: [
      {
        id: "cs1",
        name: "Tòa CS1 - Tòa học chính",
        description:
          "Tòa nhà chính 8 tầng với đầy đủ phòng học và phòng thí nghiệm",
        capacity: 2000,
        type: "classroom",
        equipment: ["Máy chiếu", "Hệ thống âm thanh", "Điều hòa", "Wifi"],
      },
      {
        id: "cs2",
        name: "Tòa CS2 - Trung tâm thực hành",
        description: "Tòa nhà 4 tầng chuyên dụng cho thực hành và lab",
        capacity: 800,
        type: "lab",
        equipment: [
          "Lab máy tính",
          "Lab mạng",
          "Lab robot",
          "Thiết bị thực hành",
        ],
      },
      {
        id: "cs3",
        name: "Tòa CS3 - Trung tâm sự kiện",
        description: "Tòa nhà 4 tầng với hội trường lớn và phòng hội thảo",
        capacity: 1200,
        type: "auditorium",
        equipment: ["Hội trường 500 chỗ", "Phòng seminar", "Studio ghi hình"],
      },
      {
        id: "library",
        name: "Thư viện trung tâm",
        description:
          "Thư viện hiện đại với hơn 100,000 đầu sách và tài liệu điện tử",
        capacity: 300,
        type: "library",
        equipment: ["Kho sách", "Phòng đọc", "Máy tính tra cứu", "Wifi miễn phí"],
      },
    ],
  };
  
  // API Functions
  export const getCMCUniversityInfo = async (): Promise<CMCUniversityInfo> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    console.log("🏫 Fetching CMC University information...");
    console.log("✅ CMC University data loaded successfully");
  
    return cmcUniversityData;
  };
  
  export const getCMCFaculties = async (): Promise<Faculty[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return cmcUniversityData.faculties;
  };
  
  export const getCMCStatistics = async (): Promise<Statistics> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return cmcUniversityData.statistics;
  };
  
  export const getCMCAchievements = async (): Promise<Achievement[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return cmcUniversityData.achievements;
  };
  
  export const getCMCFacilities = async (): Promise<Facility[]> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return cmcUniversityData.facilities;
  };
  
  // Search function for CMC information
  export const searchCMCInfo = async (query: string): Promise<any[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
  
    const results: any[] = [];
    const searchTerm = query.toLowerCase();
  
    // Search in faculties
    cmcUniversityData.faculties.forEach((faculty) => {
      if (
        faculty.name.toLowerCase().includes(searchTerm) ||
        faculty.description.toLowerCase().includes(searchTerm) ||
        faculty.majors.some((major) => major.toLowerCase().includes(searchTerm))
      ) {
        results.push({
          type: "faculty",
          data: faculty,
          relevance: "high",
        });
      }
    });
  
    // Search in achievements
    cmcUniversityData.achievements.forEach((achievement) => {
      if (
        achievement.title.toLowerCase().includes(searchTerm) ||
        achievement.description.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: "achievement",
          data: achievement,
          relevance: "medium",
        });
      }
    });
  
    // Search in facilities
    cmcUniversityData.facilities.forEach((facility) => {
      if (
        facility.name.toLowerCase().includes(searchTerm) ||
        facility.description.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: "facility",
          data: facility,
          relevance: "high",
        });
      }
    });
  
    console.log(
      `🔍 Search results for "${query}":`,
      results.length,
      "items found",
    );
    return results;
  };
  
  // Get contact information
  export const getCMCContact = () => {
    return {
      address: cmcUniversityData.address,
      phone: cmcUniversityData.phone,
      email: cmcUniversityData.email,
      website: cmcUniversityData.website,
    };
  };
  
  // Export default data for immediate use
  export default cmcUniversityData;
  