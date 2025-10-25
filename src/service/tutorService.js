import FirebaseService from "./firebaseService"

class TutorService {
  constructor() {
    this.basePath = "tutors"
  }

  async createTutor(tutorData) {
    try {
      const tutorId = await FirebaseService.create(this.basePath, {
        ...tutorData,
      })
      return tutorId
    } catch (error) {
      console.error("Error creating tutor:", error)
      throw error
    }
  }

  async getTutorById(tutorId) {
    try {
      const tutor = await FirebaseService.read(`${this.basePath}/${tutorId}`)
      return tutor || null
    } catch (error) {
      console.error("Error getting tutor:", error)
      throw error
    }
  }

  async getTutorByUserId(userId) {
  try {
    const allTutors = await FirebaseService.readAllWithKeys(this.basePath)
    const tutor = allTutors.find((w) => String(w.userId) === String(userId))
    return tutor || null
  } catch (error) {
    console.error("Error getting tutor by userId:", error)
    throw error
  }
}

  async getAllTutors() {
    try {
      const allUsers = await FirebaseService.readAll(this.basePath)
      return allUsers
    } catch (error) {
      console.error("Error getting all tutors:", error)
      throw error
    }
  }

  async getTutorsByStatus(status = "active") {
    try {
      const allTutors = await this.getAllWorkers()
      return allTutors.filter((w) => w.status === status)
    } catch (error) {
      console.error("Error filtering tutor by status:", error)
      throw error
    }
  }

  async getTutorByService(serviceId) {
    try {
      const allTutors = await this.getAllTutors()
      return allTutors.filter(
        (tutor) =>
            tutor.status === true &&
          Array.isArray(tutor.serviceId) &&
          tutor.serviceId.includes(serviceId)
      )
    } catch (error) {
      console.error("Error getting tutors by service:", error)
      throw error
    }
  }

  

  async updateTutor(innerId, tutorData) {
    try {
      const allTutors = await FirebaseService.readAllWithKeys(this.basePath)
      const target = allTutors.find(w => String(w.id) === String(innerId))
      if (!target) throw new Error("tutor not found by id: " + innerId)
  
      await FirebaseService.update(`${this.basePath}/${target.firebaseKey}`, tutorData)
      return true
    } catch (error) {
      console.error("❌ Error updating tutor:", error)
      throw error
    }
  }
  

  async deleteTutor(tutorId) {
    try {
      await FirebaseService.delete(`${this.basePath}/${tutorId}`)
      return true
    } catch (error) {
      console.error("Error deleting worker:", error)
      throw error
    }
  }

  async filterTutorsBy(serviceId, sortBy = "rating") {
    try {
      let tutors = await this.getWorkersByService(serviceId)

      switch (sortBy) {
        case "rating":
            tutors.sort((a, b) => (b.rating || 0) - (a.rating || 0))
          break
        case "price":
            tutors.sort((a, b) => extractPrice(a.price) - extractPrice(b.price))
          break
        case "distance":
            tutors.sort((a, b) => extractDistance(a.distance) - extractDistance(b.distance))
          break
      }

      return tutors
    } catch (error) {
      console.error("Error filtering tutors:", error)
      throw error
    }
  }

  listenToTutors(callback) {
    return FirebaseService.listen(this.basePath, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const tutors = Object.entries(data).map(([id, val]) => ({ id, ...val }))
        callback(tutors)
      } else {
        callback([])
      }
    })
  }
}

// Helper functions
const extractPrice = (priceString) => {
  if (!priceString) return Infinity
  const numeric = priceString.replace(/[^\d]/g, "")
  return parseInt(numeric || "0")
}

const extractDistance = (distanceString) => {
  if (!distanceString) return Infinity
  const match = distanceString.match(/[\d.]+/)
  return match ? parseFloat(match[0]) : Infinity
}

export default new TutorService()
