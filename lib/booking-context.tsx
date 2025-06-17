"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { bookings as initialBookings } from "@/lib/data"
import type { Booking } from "@/lib/data"

interface BookingContextType {
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => Promise<string>
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<boolean>
  deleteBooking: (id: string) => Promise<boolean>
  getBookingsByUser: (userId: string) => Booking[]
  getBookingsByStatus: (status: string) => Booking[]
  getBookingsByDate: (date: string) => Booking[]
  approveBooking: (id: string) => Promise<boolean>
  rejectBooking: (id: string, reason?: string) => Promise<boolean>
  checkInBooking: (id: string) => Promise<boolean>
  isLoading: boolean
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = localStorage.getItem("cmc_bookings")
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings))
      } catch (error) {
        console.error("Error loading bookings:", error)
      }
    }
  }, [])

  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings)
    localStorage.setItem("cmc_bookings", JSON.stringify(newBookings))
  }

  const addBooking = async (bookingData: Omit<Booking, "id" | "createdAt">): Promise<string> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newBooking: Booking = {
      ...bookingData,
      id: `booking_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
    }

    const updatedBookings = [...bookings, newBooking]
    saveBookings(updatedBookings)
    setIsLoading(false)

    return newBooking.id
  }

  const updateBooking = async (id: string, updates: Partial<Booking>): Promise<boolean> => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const updatedBookings = bookings.map((booking) => (booking.id === id ? { ...booking, ...updates } : booking))

    saveBookings(updatedBookings)
    setIsLoading(false)
    return true
  }

  const deleteBooking = async (id: string): Promise<boolean> => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const updatedBookings = bookings.filter((booking) => booking.id !== id)
    saveBookings(updatedBookings)
    setIsLoading(false)
    return true
  }

  const approveBooking = async (id: string): Promise<boolean> => {
    return updateBooking(id, { status: "confirmed" })
  }

  const rejectBooking = async (id: string, reason?: string): Promise<boolean> => {
    return updateBooking(id, { status: "cancelled", rejectionReason: reason })
  }

  const checkInBooking = async (id: string): Promise<boolean> => {
    return updateBooking(id, { status: "checked-in", checkedInAt: new Date().toISOString() })
  }

  const getBookingsByUser = (userId: string): Booking[] => {
    return bookings.filter((booking) => booking.studentId === userId)
  }

  const getBookingsByStatus = (status: string): Booking[] => {
    return bookings.filter((booking) => booking.status === status)
  }

  const getBookingsByDate = (date: string): Booking[] => {
    return bookings.filter((booking) => booking.date === date)
  }

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        updateBooking,
        deleteBooking,
        getBookingsByUser,
        getBookingsByStatus,
        getBookingsByDate,
        approveBooking,
        rejectBooking,
        checkInBooking,
        isLoading,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBookings() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBookings must be used within a BookingProvider")
  }
  return context
}
