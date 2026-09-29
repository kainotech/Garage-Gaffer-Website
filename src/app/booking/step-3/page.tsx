"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBookingSession, useBookingLockGuard, SelectedItem } from "@/components/booking/useBookingSession";
import BookingOrderSummary from "@/components/booking/BookingOrderSummary";
import YourDetailsForm from "@/components/booking/step3/YourDetailsForm";
import BookingAddressForm from "@/components/booking/step3/BookingAddressForm";
import AvailabilityGrid from "@/components/booking/step3/AvailabilityGrid";
import VehicleDetailsForm from "@/components/booking/step3/VehicleDetailsForm";

interface DetailsState {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  phone: string;
  availability: string | null;
  drivable: boolean;
  instructions: string;
}

const DEFAULT_DETAILS: DetailsState = {
  firstName: "", lastName: "", email: "",
  address1: "", address2: "", city: "", postcode: "", phone: "",
  availability: null, drivable: true, instructions: "",
};

export default function Step3Page() {
  const router = useRouter();
  const { getSession, updateSession, markStepComplete } = useBookingSession();
  useBookingLockGuard();

  const [session, setSession] = useState(getSession);
  const [details, setDetails] = useState<DetailsState>(DEFAULT_DETAILS);
  const [selectedWork, setSelectedWork] = useState<SelectedItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Deliberately deferred to after mount (not read during render): getSession()
    // reads sessionStorage, which would produce a server/client mismatch since
    // the server has no storage to read from.
    const s = getSession();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(s);
    setSelectedWork(s.selectedWork ?? []);
    if (s.details) {
      setDetails({
        firstName: s.details.firstName || "",
        lastName: s.details.lastName || "",
        email: s.details.email || "",
        address1: s.details.address1 || "",
        address2: s.details.address2 || "",
        city: s.details.city || "",
        postcode: s.details.postcode || s.car?.postcode || "",
        phone: s.details.phone || "",
        availability: s.details.availability ?? null,
        drivable: s.details.drivable ?? true,
        instructions: s.details.instructions || "",
      });
    } else {
      setDetails((prev) => ({ ...prev, postcode: s.car?.postcode || "" }));
    }
  }, []);

  function updateField<K extends keyof DetailsState>(field: K, value: DetailsState[K]) {
    setDetails((prev) => ({ ...prev, [field]: value }));
  }

  function selectAvailability(key: string | null) {
    setDetails((prev) => ({ ...prev, availability: key }));
  }

  function handleSubmit() {
    setError("");

    if (!details.firstName.trim()) { setError("Please enter your first name."); return; }
    if (!details.lastName.trim()) { setError("Please enter your last name."); return; }
    if (!details.email.trim() || !details.email.includes("@")) { setError("Please enter a valid email address."); return; }
    if (!details.phone.trim()) { setError("Please enter your phone number."); return; }
    if (!details.availability) { setError("Please select a date and time slot."); return; }

    updateSession({
      selectedWork,
      details: {
        ...details,
        address1: details.address1.trim(),
        address2: details.address2 || undefined,
        instructions: details.instructions || undefined,
      },
    });
    markStepComplete(3);
    router.push("/booking/step-4");
  }

  const sessionForSummary = { ...session, selectedWork };

  return (
    <div>
      <BookingOrderSummary session={sessionForSummary} />

      <div className="s3-outer container">
        {/* Your details */}
        <div className="s3-section s3-form-card">
          <h2 className="s3-section-title">Your details</h2>
          <YourDetailsForm
            values={{ firstName: details.firstName, lastName: details.lastName, email: details.email }}
            onChange={(field, value) => updateField(field as keyof DetailsState, value as DetailsState[keyof DetailsState])}
          />
        </div>

        {/* Booking address */}
        <div className="s3-section s3-form-card">
          <h2 className="s3-section-title">Booking address &amp; phone</h2>
          <BookingAddressForm
            values={{ address1: details.address1, address2: details.address2, city: details.city, postcode: details.postcode, phone: details.phone }}
            onChange={(field, value) => updateField(field as keyof DetailsState, value)}
          />
        </div>

        {/* Availability */}
        <div className="s3-section s3-form-card">
          <h2 className="s3-section-title">When is your vehicle available?</h2>
          <AvailabilityGrid
            selected={details.availability}
            onSelect={selectAvailability}
          />
        </div>

        {/* Vehicle details */}
        <div className="s3-section s3-form-card">
          <h2 className="s3-section-title">Your vehicle details</h2>
          <VehicleDetailsForm
            values={{ drivable: details.drivable, instructions: details.instructions }}
            onChange={(field, value) => updateField(field as keyof DetailsState, value as DetailsState[keyof DetailsState])}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="s3-error" role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {/* Submit */}
        <button className="btn btn-primary s3-submit" onClick={handleSubmit} type="button">
          Continue to Review
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .s3-outer { padding: 40px 24px 80px; max-width: 720px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
        .s3-section { }
        .s3-form-card {
          background: #fff; border-radius: var(--radius-xl);
          padding: 32px; box-shadow: var(--shadow-sm);
        }
        .s3-section-title {
          font-size: 18px; font-weight: 800; letter-spacing: -0.3px;
          margin-bottom: 20px; color: var(--color-text-primary);
        }
        .s3-error {
          display: flex; align-items: center; gap: 8px;
          background: #FFF0F0; color: var(--color-error);
          border: 1px solid rgba(175,8,8,0.2);
          border-radius: var(--radius-md); padding: 12px 16px;
          font-size: 13.5px; font-weight: 500;
        }
        .s3-submit {
          width: 100%; padding: 16px; font-size: 15px;
        }

        @media (max-width: 560px) {
          .s3-form-card { padding: 20px 16px; }
          .s3-section-title { font-size: 16px; }
        }
      `}</style>
    </div>
  );
}
