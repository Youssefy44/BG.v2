import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, MousePointer, Eye, AlertCircle, Monitor, Phone, Server, Calendar, RefreshCw, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BASE = import.meta.env.BASE_URL;
const navImg = (name: string) => `${BASE}nav-screenshots/${name}`;
const guideImg = (folder: string, file: string) => `${BASE}guides/${folder}/${file}`;

interface StepAction {
  type: "do" | "why" | "action" | "tip" | "warning";
  text: string;
}
interface Tab {
  label: string;
  description: string;
}
interface Step {
  number: number;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  intro: string;
  actions: StepAction[];
  tabs?: Tab[];
}

const actionConfig = {
  do: { icon: MousePointer, label: "Do this", color: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-200" },
  why: { icon: Eye, label: "Why", color: "bg-teal-50 border-teal-200 text-teal-800 dark:bg-teal-950/40 dark:border-teal-800 dark:text-teal-200" },
  action: { icon: CheckCircle, label: "Action", color: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950/40 dark:border-green-800 dark:text-green-200" },
  tip: { icon: AlertCircle, label: "Tip", color: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200" },
  warning: { icon: AlertCircle, label: "Warning", color: "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200" },
};

// ── Scheduling Steps ──────────────────────────────────────────────────────────
const schedulingSteps: Step[] = [
  {
    number: 1,
    title: "Open NextGen PM",
    subtitle: "Launch the Practice Management System",
    image: guideImg("scheduling", "step-01.png"),
    imageAlt: "NextGen - Borland Groover main screen after launch — blank gray work area with blue toolbar",
    intro: "Open NextGen Enterprise PM from your Citrix desktop. When it loads you will see a blank gray screen with the blue icon toolbar running across the top. This is your starting point for scheduling any new appointment.",
    actions: [
      { type: "do", text: "Launch NextGen Enterprise PM from your Citrix desktop." },
      { type: "why", text: "Enterprise PM (Practice Management) is the module used for all appointment scheduling, patient lookup, and demographics — not to be confused with Enterprise EHR." },
      { type: "tip", text: "You should see 'NextGen – Borland Groover' in the title bar and the patient's status bar at the bottom showing 'Ready'." },
    ],
  },
  {
    number: 2,
    title: "Open Patient Lookup",
    subtitle: "Find the Patient You Need to Schedule",
    image: guideImg("scheduling", "step-02.png"),
    imageAlt: "Patient Lookup dialog box with blank search fields — Last, First/Preferred, Birth Date, Phone",
    intro: "Click the Chart icon in the top toolbar (or press Ctrl+L) to open the Patient Lookup dialog. This lets you search for any patient in the system by name, date of birth, phone, or other identifiers.",
    actions: [
      { type: "do", text: "Click the Chart icon in the top blue toolbar — it resembles a clipboard with a person icon." },
      { type: "action", text: "The Patient Lookup dialog opens in the center of the screen." },
      { type: "tip", text: "You can also access Patient Lookup from the top menu: File → Patient Lookup, or press Ctrl+L on your keyboard." },
    ],
  },
  {
    number: 3,
    title: "Search for the Patient",
    subtitle: "Enter Patient Identifiers to Locate Their Record",
    image: guideImg("scheduling", "step-03.png"),
    imageAlt: "Patient Lookup with 'Ellis' in Last name field and '07/15/1965' in Birth Date field — Find button visible",
    intro: "Type the patient's last name and date of birth in the search fields, then click Find. You do not need to fill every field — last name + DOB is usually sufficient to narrow results.",
    actions: [
      { type: "do", text: "Type the patient's last name in the 'Last' field." },
      { type: "do", text: "Type the patient's date of birth in the 'Birth Date' field (format: MM/DD/YYYY)." },
      { type: "action", text: "Click the Find button at the bottom of the dialog to search." },
      { type: "tip", text: "If you get too many results, add the first name or phone number to narrow it down." },
    ],
  },
  {
    number: 4,
    title: "Open the Patient Chart",
    subtitle: "Select the Correct Patient and Open Their Record",
    image: guideImg("scheduling", "step-04.png"),
    imageAlt: "Patient Lookup showing Ellis, Taylor in Matching Records — row is highlighted blue, Open button is visible",
    intro: "After clicking Find, matching patients appear in the Matching Records list. Verify the name, DOB, and address match your caller, then click Open to load their full chart.",
    actions: [
      { type: "do", text: "Review the Matching Records section — check Name, Birth Date, and Address to confirm this is the right patient." },
      { type: "do", text: "Click the correct patient's row to highlight it in blue." },
      { type: "action", text: "Click the Open button (bottom right of the dialog) to open the full chart." },
      { type: "warning", text: "Always verify identity before opening. If multiple matches appear, confirm additional details with the caller (e.g., address or last 4 of SSN)." },
    ],
  },
  {
    number: 5,
    title: "Review the Patient Chart",
    subtitle: "Confirm Demographics and Check Existing Appointments",
    image: guideImg("scheduling", "step-05.png"),
    imageAlt: "Patient Chart for Ellis, Taylor showing Demographics tab with contact info, PCP, insurance, and chart tabs",
    intro: "The patient chart opens to the Demographics view. Confirm you have the right patient by reviewing their name, DOB, PCP, and contact information before proceeding to schedule.",
    actions: [
      { type: "do", text: "Confirm the patient name, date of birth, and primary care provider match what the caller told you." },
      { type: "do", text: "Note the patient's preferred phone number for confirmation purposes." },
      { type: "tip", text: "Check the Appointments section of the chart to confirm the patient doesn't already have a pending appointment for the same issue." },
    ],
  },
  {
    number: 6,
    title: "Open the Tasks Menu",
    subtitle: "Navigate to the Appointment Book",
    image: guideImg("scheduling", "step-06.png"),
    imageAlt: "NextGen top menu bar with Tasks menu open, showing options including Appt Book, Appt Search, and Create Task",
    intro: "With the patient chart open, click Tasks in the top menu bar. This is how you navigate to the Appointment Book where you can create a new appointment.",
    actions: [
      { type: "do", text: "Click Tasks in the top menu bar (between Edit and Reports)." },
      { type: "action", text: "The Tasks dropdown menu opens showing all appointment and task options." },
      { type: "tip", text: "You can also use keyboard shortcuts: Ctrl+B opens the Appt Book directly in some versions." },
    ],
  },
  {
    number: 7,
    title: "Click Appt Book",
    subtitle: "Open the Appointment Book for This Patient",
    image: guideImg("scheduling", "step-07.png"),
    imageAlt: "Tasks dropdown with 'Appt Book' highlighted near the top of the list",
    intro: "From the Tasks menu, select Appt Book. This opens the appointment scheduling book, which is tied to the current patient's chart.",
    actions: [
      { type: "do", text: "Click Appt Book from the Tasks dropdown menu." },
      { type: "action", text: "The Appointment Book panel opens on the right side of the screen alongside the patient chart." },
      { type: "tip", text: "If you see 'Appt Search' and 'Appt Book' as separate options — for scheduling new appointments always use Appt Book, not Appt Search." },
    ],
  },
  {
    number: 8,
    title: "Open Appointment Search Ahead",
    subtitle: "Search for Available Appointment Slots",
    image: guideImg("scheduling", "step-08.png"),
    imageAlt: "Appointment Search Ahead dialog open — Event type, Service Location, Resources/Classes fields visible",
    intro: "The Appointment Search Ahead tool lets you find the next available openings across providers and locations. You'll set the event type, location, and provider to narrow down the results.",
    actions: [
      { type: "do", text: "In the Appointment Book, click the Search or 'Appt Search Ahead' option to open the Appointment Search Ahead dialog." },
      { type: "action", text: "The Appointment Search Ahead dialog opens with criteria fields at the top and results appearing below after you search." },
      { type: "why", text: "This tool searches all matching open slots across your selected date range — much faster than manually scrolling through the calendar." },
    ],
  },
  {
    number: 9,
    title: "Select Event Type",
    subtitle: "Choose the Type of Appointment",
    image: guideImg("scheduling", "step-09.png"),
    imageAlt: "Appointment Search Ahead — Event field dropdown with appointment types listed (Follow Up, New Patient, etc.)",
    intro: "In the Event field at the top of the Search Ahead dialog, select the correct appointment type. This determines which slots are shown — providers may only have certain event types available.",
    actions: [
      { type: "do", text: "Click the Event dropdown and select the appropriate appointment type (e.g., Follow Up, New Patient, Procedure)." },
      { type: "do", text: "Set the Duration field if it appears — the default duration is typically pre-filled based on event type." },
      { type: "tip", text: "When in doubt about which event type to select, ask your supervisor. Incorrect event types can result in incorrect slot lengths being used." },
      { type: "warning", text: "Never book a New Patient appointment for an established patient, or vice versa — always confirm with the caller." },
    ],
  },
  {
    number: 10,
    title: "Select Service Location",
    subtitle: "Choose Which Office Location",
    image: guideImg("scheduling", "step-10.png"),
    imageAlt: "Appointment Search Ahead — Service Location field showing available office locations in dropdown",
    intro: "Select the Service Location (office) where the patient wants to be seen. This filters results to only show availability at the selected location.",
    actions: [
      { type: "do", text: "Click the Service Location dropdown and select the correct office (e.g., Orange Park Office, Southside Office)." },
      { type: "why", text: "Selecting the correct location ensures you're scheduling at the right office — patients may have a preferred location or their PCP may only see patients at specific sites." },
      { type: "tip", text: "If the patient doesn't have a preference, offer the location closest to their zip code or the one with the earliest availability." },
    ],
  },
  {
    number: 11,
    title: "Select Provider and Find Slots",
    subtitle: "Filter by Provider and Search for Openings",
    image: guideImg("scheduling", "step-11.png"),
    imageAlt: "Appointment Search Ahead — Resources/Classes section with providers listed, Abadeer MD highlighted; Available Timeslots appear below",
    intro: "In the Resources/Classes section, select the provider the patient wants to see. Then click Find to search for available appointments. Matching timeslots appear in the Available Timeslots list below.",
    actions: [
      { type: "do", text: "In the Resources/Classes section, check the box next to the correct provider (e.g., Abadeer MD, Kerolos)." },
      { type: "do", text: "Set your date range (Start Date and End Date) — typically the next 7–14 days." },
      { type: "action", text: "Click the Find button to search. Available timeslots appear in the list below." },
      { type: "tip", text: "If no slots appear, widen your date range or check with a different provider. Never tell the patient there's 'no availability' without checking multiple providers." },
    ],
  },
  {
    number: 12,
    title: "Select a Timeslot",
    subtitle: "Choose an Available Appointment Time",
    image: guideImg("scheduling", "step-12.png"),
    imageAlt: "Add Appointment form — left panel shows date/time/event/resources, right panel shows patient demographics",
    intro: "After selecting a timeslot from the results, the Add Appointment form opens. This split view shows the appointment details on the left and the patient's demographics on the right. Verify the date, time, and provider are correct.",
    actions: [
      { type: "do", text: "In the Available Timeslots list, click the timeslot that works for the patient (confirm date and time verbally with the caller)." },
      { type: "action", text: "The Add Appointment form opens — the left panel shows the appointment details and the right panel shows patient info." },
      { type: "do", text: "Verify the Date, Time, Event type, Provider, and Service Location shown in the left panel are all correct." },
      { type: "tip", text: "Always read the date and time back to the patient before saving: 'I have you scheduled for [Day, Month Date] at [Time] with Dr. [Name] at [Location]. Does that work for you?'" },
    ],
  },
  {
    number: 13,
    title: "Enter Appointment Description",
    subtitle: "Document the Reason for Visit",
    image: guideImg("scheduling", "step-13.png"),
    imageAlt: "Add Appointment form — Description field filled in with 'Abdominal Pain' as the reason for visit",
    intro: "In the Description field on the left panel, type the patient's chief complaint or reason for the visit. This helps the clinical team prepare before the appointment.",
    actions: [
      { type: "do", text: "Click in the Description field and type the patient's reason for the visit (e.g., 'Abdominal Pain', 'Follow Up colonoscopy results', 'Medication refill')." },
      { type: "why", text: "The description is seen by the provider's team before the appointment — it helps them prepare and triage appropriately." },
      { type: "tip", text: "Keep the description brief and clinical. Do not include full sentences — a few keywords are sufficient (e.g., 'Abdominal pain x 2 weeks')." },
    ],
  },
  {
    number: 14,
    title: "Set the Caller Field",
    subtitle: "Document Who Is Making the Appointment",
    image: guideImg("scheduling", "step-14.png"),
    imageAlt: "Add Appointment form — Caller field in User Defined section set to 'Patient'",
    intro: "In the User Defined section of the left panel, set the Caller field to identify who is calling in to schedule the appointment.",
    actions: [
      { type: "do", text: "Locate the Caller field in the User Defined section (lower left of the form)." },
      { type: "do", text: "Select the appropriate option from the dropdown: 'Patient' if the patient is calling, or 'Caregiver'/'Family Member' if someone is calling on their behalf." },
      { type: "why", text: "Documenting the caller type is required for records and helps identify if third-party consent is needed for HIPAA-protected information." },
    ],
  },
  {
    number: 15,
    title: "Go to the Insurance Tab",
    subtitle: "Link Patient Insurance to the Appointment",
    image: guideImg("scheduling", "step-15.png"),
    imageAlt: "Add Appointment form — Insurance tab visible on the right panel showing empty Appointment Insurance section",
    intro: "Click the Insurance tab in the right-hand panel to see and add the patient's insurance information to this appointment. Linking insurance ensures the correct plan is associated with the visit.",
    actions: [
      { type: "do", text: "Click the Insurance tab in the right panel of the Add Appointment form." },
      { type: "action", text: "The Appointment Insurance section opens — it will be empty until you add insurance." },
      { type: "why", text: "Attaching insurance ensures billing can process the claim correctly after the visit. Missing insurance will cause billing delays." },
    ],
  },
  {
    number: 16,
    title: "Open Insurance Context Menu",
    subtitle: "Right-Click to Access Insurance Options",
    image: guideImg("scheduling", "step-16.png"),
    imageAlt: "Add Appointment Insurance section — right-click context menu showing New Insurance, Open Insurance, and other options",
    intro: "In the Appointment Insurance section, right-click to open the context menu. This gives you options to add existing insurance from the patient's file.",
    actions: [
      { type: "do", text: "Right-click anywhere in the empty Appointment Insurance area." },
      { type: "action", text: "A context menu appears with options: New Insurance, Open Insurance, Delete Insurance, and others." },
      { type: "do", text: "Click 'Open Insurance…' to select from the patient's existing insurance plans on file." },
      { type: "tip", text: "Use 'Open Insurance' (not 'New Insurance') unless the patient's insurance is not yet in the system. Most established patients already have plans on file." },
    ],
  },
  {
    number: 17,
    title: "Select Patient's Insurance",
    subtitle: "Choose the Correct Plan from the Insurance List",
    image: guideImg("scheduling", "step-17.png"),
    imageAlt: "Appointment Insurance Selection dialog — Insurance Listing on the left showing Patient with Aetna HMO QPOS; Selected Insurance panel on the right is empty",
    intro: "The Appointment Insurance Selection dialog shows all insurance plans on file for this patient in the Insurance Listing panel. Select the correct plan and move it to the Selected Insurance panel on the right.",
    actions: [
      { type: "do", text: "In the Insurance Listing (left panel), click the patient's primary insurance plan to highlight it (e.g., Aetna HMO QPOS)." },
      { type: "do", text: "Click the right-arrow button (→) to move the selected plan into the Selected Insurance panel on the right." },
      { type: "action", text: "The plan now appears in the Selected Insurance panel with the patient's name and relationship." },
      { type: "tip", text: "If the patient has multiple plans, select the primary plan first. Secondary insurance can be added as well if applicable." },
    ],
  },
  {
    number: 18,
    title: "Confirm Insurance Selection",
    subtitle: "Verify the Correct Plan Is Selected and Click OK",
    image: guideImg("scheduling", "step-18.png"),
    imageAlt: "Appointment Insurance Selection — Aetna HMO QPOS moved to Selected Insurance panel showing patient name and relationship",
    intro: "With the insurance plan now in the Selected Insurance panel, verify it is the correct plan for this patient, then click OK to attach it to the appointment.",
    actions: [
      { type: "do", text: "Confirm the Selected Insurance panel shows the correct plan (Payer Name, Insured Name, and Relationship)." },
      { type: "action", text: "Click OK to attach the insurance and close the Insurance Selection dialog." },
      { type: "tip", text: "The relationship should typically be 'Patient' unless the patient is a dependent on a spouse's or parent's plan." },
    ],
  },
  {
    number: 19,
    title: "Verify Insurance on Appointment",
    subtitle: "Confirm Insurance Is Now Attached",
    image: guideImg("scheduling", "step-19.png"),
    imageAlt: "Add Appointment Insurance tab now shows Aetna HMO QPOS listed with Ellis, Taylor as the insured",
    intro: "After clicking OK, the insurance plan now appears in the Appointment Insurance section. Verify the correct plan and insured name are shown before saving the appointment.",
    actions: [
      { type: "do", text: "Confirm the Appointment Insurance section now shows the patient's plan (e.g., Aetna HMO QPOS) and the patient's name as the insured." },
      { type: "tip", text: "If the wrong insurance appears or the section is still empty, right-click again and re-select the correct plan." },
      { type: "warning", text: "Do not save the appointment with missing insurance unless you have confirmed the patient is self-pay." },
    ],
  },
  {
    number: 20,
    title: "Save the Appointment",
    subtitle: "Click OK to Confirm and Save",
    image: guideImg("scheduling", "step-20.png"),
    imageAlt: "Patient chart — Appointments (4) in Clinical History now shows the new Follow Up appointment added to the list",
    intro: "With all fields completed — event type, time, description, caller, and insurance — click OK to save the appointment. The chart's Appointments section will update to show the new entry.",
    actions: [
      { type: "action", text: "Click OK at the bottom right of the Add Appointment form to save the appointment." },
      { type: "do", text: "The dialog closes and the patient chart refreshes — navigate to Chart Notes → Appointments to confirm the new appointment appears in the list." },
      { type: "do", text: "Read the appointment details back to the patient: provider, date, time, and location." },
      { type: "tip", text: "Remind the patient of any preparation instructions and the office's cancellation policy (24-hour notice)." },
      { type: "tip", text: "Document the call outcome in Talkdesk — select the 'Appointment Scheduled' disposition code before closing the call." },
    ],
  },
];

// ── Rescheduling Steps ────────────────────────────────────────────────────────
const reschedulingSteps: Step[] = [
  {
    number: 1,
    title: "Open NextGen PM",
    subtitle: "Launch the Practice Management System",
    image: guideImg("rescheduling", "step-01.png"),
    imageAlt: "NextGen – Borland Groover main screen — blank gray work area with blue toolbar at top",
    intro: "Open NextGen Enterprise PM from your Citrix desktop. The main screen loads as a blank gray area with the blue toolbar at the top. This is your starting point for rescheduling any existing appointment.",
    actions: [
      { type: "do", text: "Launch NextGen Enterprise PM from your Citrix desktop." },
      { type: "why", text: "All appointment rescheduling is done in Enterprise PM, not EHR. Make sure you're in the right module." },
    ],
  },
  {
    number: 2,
    title: "Open Patient Lookup",
    subtitle: "Search for the Patient's Record",
    image: guideImg("rescheduling", "step-02.png"),
    imageAlt: "Patient Lookup dialog — empty search form with Last, First/Preferred, Birth Date, Phone, and other fields",
    intro: "Click the Chart icon in the top toolbar to open the Patient Lookup dialog. You'll use this to find the patient whose appointment you need to reschedule.",
    actions: [
      { type: "do", text: "Click the Chart icon in the top blue toolbar to open the Patient Lookup dialog." },
      { type: "tip", text: "You can also press Ctrl+L as a shortcut to open Patient Lookup." },
    ],
  },
  {
    number: 3,
    title: "Search and Find Patient",
    subtitle: "Enter Search Criteria and Locate the Record",
    image: guideImg("rescheduling", "step-03.png"),
    imageAlt: "Patient Lookup with 'Ellis' in Last field, 'Taylor' in First field, '07/15/1965' in Birth Date — Ellis, Taylor highlighted in Matching Records",
    intro: "Enter the patient's last name and date of birth (at minimum) and click Find. The matching patient(s) will appear in the results list below. Click the correct patient to highlight them.",
    actions: [
      { type: "do", text: "Enter the patient's last name in the 'Last' field and date of birth in the 'Birth Date' field." },
      { type: "action", text: "Click Find to search. The matching patient appears in the Matching Records list." },
      { type: "do", text: "Click the correct patient row to highlight it, then click Open." },
      { type: "warning", text: "If multiple patients match, verify the address and DOB with the caller before opening any record." },
    ],
  },
  {
    number: 4,
    title: "Open the Patient Chart",
    subtitle: "Review Demographics Before Proceeding",
    image: guideImg("rescheduling", "step-04.png"),
    imageAlt: "Patient Chart for Ellis, Taylor — Demographics tab showing contact info, PCP Abaaba MD, Abiedu, phone, email, and address",
    intro: "The patient chart opens to the Demographics view. Confirm the patient identity before proceeding to look at their appointments.",
    actions: [
      { type: "do", text: "Verify the patient name, date of birth, and contact information match what the caller provided." },
      { type: "tip", text: "Note their preferred phone number in case you need to call them back for confirmation." },
    ],
  },
  {
    number: 5,
    title: "Navigate to Clinical History",
    subtitle: "Open the Chart Notes Tree",
    image: guideImg("rescheduling", "step-05.png"),
    imageAlt: "Patient Chart — Clinical History/Notes tab selected, left panel shows tree with Clinical History, Chart Notes, and subcategories",
    intro: "Click on the Clinical History/Notes tab in the patient chart. This opens the left-side tree panel where you can navigate to the Appointments section to view the patient's scheduled visits.",
    actions: [
      { type: "do", text: "Click the Clinical History/Notes tab in the patient chart (the tab bar runs across the middle of the screen)." },
      { type: "action", text: "The left panel shows the topic tree — you'll see Clinical History, Chart Notes, and their subcategories." },
    ],
  },
  {
    number: 6,
    title: "View Existing Appointments",
    subtitle: "See All Scheduled Appointments",
    image: guideImg("rescheduling", "step-06.png"),
    imageAlt: "Chart Notes tree — Appointments (4) highlighted, right panel shows appointment list with Date/Time, Event, Location, Status columns",
    intro: "In the left tree panel, click Appointments to see all of the patient's scheduled appointments. The right panel shows the full appointment list with dates, event types, locations, and statuses.",
    actions: [
      { type: "do", text: "In the left tree panel, locate and click Appointments (the number in parentheses shows how many are on file)." },
      { type: "do", text: "Review the appointment list in the right panel — identify the appointment the patient wants to reschedule." },
      { type: "tip", text: "Check the Status column — look for 'Kept' or 'Advert' (future) appointments. 'Expi' means the slot has already passed." },
    ],
  },
  {
    number: 7,
    title: "Open the Existing Appointment",
    subtitle: "Double-Click to Open Appointment Details",
    image: guideImg("rescheduling", "step-07.png"),
    imageAlt: "Edit Appointment panel open on the right — showing existing appointment details including date, time, event chain, resources, service location, and patient demographics",
    intro: "Double-click the appointment in the list to open it in the Edit Appointment panel. This shows all details of the existing appointment on the left and the patient's information on the right.",
    actions: [
      { type: "do", text: "Double-click the appointment row you need to reschedule in the Appointments list." },
      { type: "action", text: "The Edit Appointment form opens — showing date, time, event type, provider, and service location." },
      { type: "do", text: "Confirm this is the correct appointment (verify date, provider, and reason for visit with the caller)." },
    ],
  },
  {
    number: 8,
    title: "Open Tasks Menu",
    subtitle: "Navigate to Appointment Search",
    image: guideImg("rescheduling", "step-08.png"),
    imageAlt: "Top menu Tasks dropdown open — showing Lookup, Apptsec, Appt Book, Appt Search and other options",
    intro: "With the appointment open, click Tasks in the top menu bar to access the Appointment Search Ahead tool. This is how you search for a new available time slot to move the appointment to.",
    actions: [
      { type: "do", text: "Click Tasks in the top menu bar." },
      { type: "action", text: "The Tasks dropdown opens." },
      { type: "do", text: "Click 'Appt Search…' (not Appt Book) to open the Appointment Search Ahead dialog for rescheduling." },
    ],
  },
  {
    number: 9,
    title: "Appointment Search Ahead Opens",
    subtitle: "Prepare to Search for New Slots",
    image: guideImg("rescheduling", "step-09.png"),
    imageAlt: "Appointment Search Ahead dialog — Event, Duration, Date/Time Range, Service Location, Resources/Classes fields visible",
    intro: "The Appointment Search Ahead dialog opens. The search fields are pre-filled based on the existing appointment. Review the event type and location, then set a new date range to find available slots.",
    actions: [
      { type: "do", text: "Confirm the Event type is correct (it should pre-fill from the existing appointment)." },
      { type: "do", text: "Confirm the Service Location is correct — this is where the patient will be rescheduled." },
      { type: "tip", text: "If the patient wants a different location or provider, update those fields before searching." },
    ],
  },
  {
    number: 10,
    title: "Select Provider and Location",
    subtitle: "Filter by Provider in the Resources Section",
    image: guideImg("rescheduling", "step-10.png"),
    imageAlt: "Appointment Search Ahead — Resources/Classes showing We Care Physicians group, Abadeer MD selected; Service Location set to Orange Park Office",
    intro: "In the Resources/Classes section, select the provider the patient prefers for the rescheduled appointment. Ensure the correct service location (office) is also set.",
    actions: [
      { type: "do", text: "In the Resources/Classes section, expand the provider group (e.g., We Care Physicians) and check the box next to the provider." },
      { type: "do", text: "Confirm the Service Location field shows the correct office location." },
      { type: "tip", text: "If the patient has a specific provider preference, make sure only that provider is checked before clicking Find." },
    ],
  },
  {
    number: 11,
    title: "Set New Date Range",
    subtitle: "Search a Future Date Window for Availability",
    image: guideImg("rescheduling", "step-11.png"),
    imageAlt: "Appointment Search Ahead — Start Date 06/10/2026, End Date 06/17/2026 (one week window), Patient field shows 'Ellis'",
    intro: "Set a new date range that gives you a reasonable window to find an open slot — typically 1–2 weeks out. The Patient field should already be populated from the chart you have open.",
    actions: [
      { type: "do", text: "Update the Start Date to today's date or the soonest appropriate date." },
      { type: "do", text: "Update the End Date to create a 1–2 week search window (e.g., 7–14 days from the start date)." },
      { type: "do", text: "Confirm the Patient field is populated with the correct patient name." },
      { type: "action", text: "Click Find to search for available timeslots." },
    ],
  },
  {
    number: 12,
    title: "Review Available Timeslots",
    subtitle: "See Open Appointment Slots in the Results",
    image: guideImg("rescheduling", "step-12.png"),
    imageAlt: "Appointment Search Ahead — Available Timeslots section showing multiple Thursday June 18 slots with Abadeer MD, Kerolos at Orange Park O.",
    intro: "After clicking Find, the Available Timeslots list populates with all open appointments matching your criteria. Review the options and offer them to the patient.",
    actions: [
      { type: "do", text: "Review the Available Timeslots list — it shows Date/Time, Provider, Location, and Distance." },
      { type: "do", text: "Offer the earliest available slot to the patient, then provide alternatives if they can't make that time." },
      { type: "tip", text: "If no slots appear, widen your date range, try a different provider, or check nearby locations." },
    ],
  },
  {
    number: 13,
    title: "Select the New Timeslot",
    subtitle: "Click the Slot the Patient Prefers",
    image: guideImg("rescheduling", "step-13.png"),
    imageAlt: "Appointment Search Ahead — first available Thursday June 18, 2026 at 01:15 PM slot highlighted in the Available Timeslots list",
    intro: "Click the timeslot that the patient agrees to. This selects it as the new appointment time and begins the rescheduling process.",
    actions: [
      { type: "do", text: "Click the patient's preferred timeslot in the Available Timeslots list to highlight it." },
      { type: "action", text: "The selected slot is highlighted in blue — confirm the date, time, and provider with the patient." },
      { type: "tip", text: "Always read the new date and time back to the patient before proceeding: 'I have a slot available on [Day, Date] at [Time] with Dr. [Name]. Does that work?'" },
    ],
  },
  {
    number: 14,
    title: "Time Updates in the Form",
    subtitle: "New Time Appears in the Appointment Panel",
    image: guideImg("rescheduling", "step-14.png"),
    imageAlt: "Edit Appointment form — Time field now shows 1:15 PM updated from the selected slot",
    intro: "After selecting the timeslot, the appointment time in the Edit Appointment panel updates automatically to reflect the new time you selected. Verify the updated time is correct.",
    actions: [
      { type: "do", text: "Confirm the Time field in the Edit Appointment form has updated to the new selected time (e.g., 1:15 PM)." },
      { type: "do", text: "Verify the date has also updated to match the new slot." },
      { type: "tip", text: "If the time did not update, click the slot again in the Available Timeslots list." },
    ],
  },
  {
    number: 15,
    title: "Verify Insurance on the Appointment",
    subtitle: "Check the Insurance Tab Before Saving",
    image: guideImg("rescheduling", "step-15.png"),
    imageAlt: "Edit Appointment — Insurance tab on right panel showing patient's insurance on file (Aetna HMO QPOS)",
    intro: "Check the Insurance tab in the right panel to confirm the patient's insurance is already attached to this rescheduled appointment. The existing insurance should carry over from the original appointment.",
    actions: [
      { type: "do", text: "Click the Insurance tab in the right panel of the Edit Appointment form." },
      { type: "do", text: "Confirm the patient's current insurance plan is listed (it should carry over from the original appointment)." },
      { type: "tip", text: "If the insurance section is empty or shows an expired plan, right-click to add the correct plan before saving." },
    ],
  },
  {
    number: 16,
    title: "Edit Appointment Confirmation",
    subtitle: "Review All Appointment Details",
    image: guideImg("rescheduling", "step-16.png"),
    imageAlt: "Edit Appointment dialog showing full details — date, time, event chain (Follow Up), resources, service location, description, and patient demographics",
    intro: "Review the complete Edit Appointment form one more time before saving. Confirm all fields are correct — date, time, event type, provider, location, and description.",
    actions: [
      { type: "do", text: "Review: Date, Time, Event/Event Chain, Resources (provider), Service Location, and Description." },
      { type: "do", text: "Confirm the patient demographics on the right side match the caller." },
      { type: "tip", text: "This is your last chance to catch any errors before the reschedule is confirmed." },
    ],
  },
  {
    number: 17,
    title: "Enter Reason for Reschedule",
    subtitle: "Document Why the Appointment Is Being Moved",
    image: guideImg("rescheduling", "step-17.png"),
    imageAlt: "NextGen dialog asking for reason for appointment reschedule — dropdown and text entry visible",
    intro: "A dialog appears asking for the reason for rescheduling. Select the appropriate reason from the dropdown and/or enter a brief note. This is required for documentation purposes.",
    actions: [
      { type: "do", text: "Select the appropriate reason from the 'Reason for appointment/reschedule' dropdown." },
      { type: "action", text: "Click OK to confirm the reschedule reason and complete the rescheduling process." },
      { type: "tip", text: "Common reasons include: Patient Request, Provider Unavailable, Schedule Conflict. Use the most accurate option." },
    ],
  },
  {
    number: 18,
    title: "Reschedule Complete",
    subtitle: "Confirm the New Appointment Appears in the Chart",
    image: guideImg("rescheduling", "step-18.png"),
    imageAlt: "Patient chart Appointments list — now shows the new Follow Up appointment dated 06/18/2026 at top of the list, replacing the original",
    intro: "The reschedule is complete. The chart's Appointments list updates to show the newly rescheduled appointment. Confirm with the patient and complete your documentation.",
    actions: [
      { type: "do", text: "Confirm the new appointment appears in the Appointments list with the correct date, time, and provider." },
      { type: "do", text: "Read the final appointment details back to the patient one more time to confirm: date, time, provider, and location." },
      { type: "action", text: "End the call and update Talkdesk — select 'Appointment Rescheduled' or the appropriate disposition code." },
      { type: "tip", text: "Remind the patient of the 24-hour cancellation policy and any preparation instructions for their visit." },
    ],
  },
];

// ── Clinical Messaging Steps ──────────────────────────────────────────────────
const clinicalSteps: Step[] = [
  {
    number: 1,
    title: "Greeting & Validation",
    subtitle: "Open the Call and Verify the Patient",
    image: guideImg("clinical", "step-01.png"),
    imageAlt: "Clinical Message Step-by-Step reference guide — steps 1 through 7 overview",
    intro: "Start every clinical messaging call with your standard BG greeting. Before proceeding into EHR, validate who you are speaking with and confirm the reason for the call. This step covers steps 1–7 of the clinical messaging workflow.",
    actions: [
      { type: "do", text: "Answer with your standard greeting: 'Thank you for calling Borland Groover, this is [Name]. How can I assist you?'" },
      { type: "do", text: "Confirm you are speaking with the patient or an authorized caller. If the caller is NOT the patient, ask for their name and relationship to the patient." },
      { type: "warning", text: "If it is a New Patient calling — do NOT send a clinical message. New patients do not have an established clinical relationship and should be routed differently." },
    ],
  },
  {
    number: 2,
    title: "Verify Demographics",
    subtitle: "Confirm Patient Identity Before Proceeding",
    image: guideImg("clinical", "step-01.png"),
    imageAlt: "Clinical Message Step-by-Step — Step 2: Verify demographics",
    intro: "Look up the patient in NextGen and verify their demographic details match what the caller provides. This is a HIPAA-required identity check before discussing any medical information.",
    actions: [
      { type: "do", text: "Pull up the patient in NextGen PM and confirm: Name, Date of Birth, and Address (or phone number) with the caller." },
      { type: "why", text: "This is required for HIPAA compliance — you must verify identity before sharing or receiving any protected health information." },
      { type: "tip", text: "Do not reveal information to prompt the caller — ask them to provide the information first, then confirm." },
    ],
  },
  {
    number: 3,
    title: "Check Appointment History",
    subtitle: "Establish the Patient's Visit Pattern",
    image: guideImg("clinical", "step-01.png"),
    imageAlt: "Clinical Message Step-by-Step — Step 3: Check appointment history",
    intro: "Before opening EHR, review the patient's appointment history in NextGen PM. Check when their last office visit was kept and whether there are any previous clinical messages relevant to today's call.",
    actions: [
      { type: "do", text: "Navigate to the patient's Appointments section in the chart and check the last office visit date." },
      { type: "do", text: "Check the History section for any previous clinical messages related to today's request." },
      { type: "tip", text: "If there is an open (unresolved) previous message on the same topic, reference it — do not create a duplicate." },
    ],
  },
  {
    number: 4,
    title: "Open EHR",
    subtitle: "Switch to the Electronic Health Record",
    image: guideImg("clinical", "step-01.png"),
    imageAlt: "Clinical Message Step-by-Step — Step 4: Open EHR showing NextGen EHR with Office Location and Doctor dropdowns",
    intro: "Open NextGen Enterprise EHR (not PM) for the patient. In EHR, set the correct Office Location and Doctor before proceeding. The default settings are Orange Park Office and Madhok, Dinesh.",
    actions: [
      { type: "do", text: "Open the patient record in NextGen Enterprise EHR." },
      { type: "do", text: "Set the Office Location dropdown to the correct office (default: Orange Park Office)." },
      { type: "do", text: "Set the Doctor dropdown to the correct provider (default: Madhok, Dinesh)." },
      { type: "warning", text: "NEVER use any surgery center or endoscopy center as the office location for clinical messaging." },
      { type: "tip", text: "The defaults are Orange Park Office and Madhok, Dinesh — only change these if the patient's PCP is at a different location." },
    ],
  },
  {
    number: 5,
    title: "Create a New Folder",
    subtitle: "Start a New Communication Entry in Patient History",
    image: guideImg("clinical", "step-01.png"),
    imageAlt: "Clinical Message Step-by-Step — Step 5: New folder — Patient History section with New button highlighted",
    intro: "In EHR, navigate to the Patient History section and create a new folder for this clinical message. A new folder is required when the call date is different from the last communication, the last folder has a doctor's report, or the request is different from the previous entry.",
    actions: [
      { type: "do", text: "Navigate to the Patient History section in EHR." },
      { type: "do", text: "Review the last phone communication entry — check the date and content." },
      { type: "action", text: "Click the New button to create a new folder if ANY of the following apply:" },
      { type: "tip", text: "Create a new folder when: (1) the call date is different, (2) the last folder has a doctor's report, or (3) the request is different from the previous folder's topic." },
    ],
  },
  {
    number: 6,
    title: "Select a Template",
    subtitle: "Choose the Telephone Communication Template",
    image: guideImg("clinical", "step-01.png"),
    imageAlt: "Clinical Message Step-by-Step — Step 6: Template section showing Custom Templates menu with Telephone Communication option",
    intro: "Inside the new folder, click the Template option and select 'Telephone Communication' from the Custom Templates menu. This pre-populates the message structure with the required fields.",
    actions: [
      { type: "do", text: "Click the Template button/icon in the new folder." },
      { type: "action", text: "From the Custom Templates menu, select 'Telephone Communication'." },
      { type: "why", text: "Using the Telephone Communication template ensures all required fields are captured consistently and meets documentation standards." },
    ],
  },
  {
    number: 7,
    title: "Select the Message Type",
    subtitle: "Set the Call Type in the Template",
    image: guideImg("clinical", "step-01.png"),
    imageAlt: "Clinical Message Step-by-Step — Step 7: Message section showing call type options and urgency/callback dropdowns",
    intro: "In the Telephone Communication template, select the appropriate call type and configure the message settings based on the nature of the call.",
    actions: [
      { type: "do", text: "In the Call Information section, select the correct Contact Type for this call." },
      { type: "do", text: "Set Urgency and other options based on the call details." },
      { type: "tip", text: "End of Business: when the patient needs to be called back by end of day." },
      { type: "tip", text: "No Callback Needed: just to inform the office about the patient's case — no response needed." },
      { type: "tip", text: "Spoke With: do NOT default to 'Patient' if you truly did not speak with the patient directly (e.g., spoke with caregiver)." },
      { type: "tip", text: "Other: covers all general types of calls. Medication Management: specifically for medication refill requests." },
      { type: "warning", text: "If the caller is NOT the patient — always ask for their name and their relationship to the patient before documenting." },
    ],
  },
  {
    number: 8,
    title: "Enter Contact Information & Message",
    subtitle: "Document Preferred Contact and Write the Message",
    image: guideImg("clinical", "step-02.png"),
    imageAlt: "Clinical Message Step-by-Step — Step 8: Select preferred phone contact and type the message content",
    intro: "In the Contact Information section, select the patient's preferred callback phone number. Then in the Communication section, type the full message detailing the patient's request.",
    actions: [
      { type: "do", text: "In the Contact Information section, select the patient's preferred phone contact from the options listed." },
      { type: "do", text: "In the Communication section, type the complete message — include all relevant details the clinical team needs to respond." },
      { type: "tip", text: "Ask the patient for their best callback number. For the patient, select the best number listed in their chart. For an external caller, ask for their contact number and add it to the message details." },
      { type: "warning", text: "Do not omit the preferred contact information — the clinical team needs this to call the patient back." },
    ],
  },
  {
    number: 9,
    title: "Task the Chart",
    subtitle: "Use Add & Task to Create the EHR Task",
    image: guideImg("clinical", "step-02.png"),
    imageAlt: "Clinical Message Step-by-Step — Step 9: Task the chart using the Add & Task button",
    intro: "Once the message is complete, click 'Add & Task' (not just Add or Save & Reply) to save the communication AND create a task that will be sent to the clinical team.",
    actions: [
      { type: "do", text: "Click the 'Add & Task' button at the bottom of the template form." },
      { type: "why", text: "'Add & Task' does two things: saves the communication entry AND opens the New EHR Task dialog so you can assign it to the clinical team." },
      { type: "warning", text: "Do NOT click just 'Add' or 'Save & Reply' — these will NOT create the clinical task. The clinical team will not be notified unless you use Add & Task." },
    ],
  },
  {
    number: 10,
    title: "Assign to the Clinical Team",
    subtitle: "Always Assign to the Team — Never Directly to the Doctor",
    image: guideImg("clinical", "step-02.png"),
    imageAlt: "Clinical Message Step-by-Step — Step 10: Assign To field showing Abadeer Clinical Team — never directly to the doctor",
    intro: "In the New EHR Task dialog, find the Assign To field and assign the task to the clinical team (e.g., Abadeer Clinical Team). Never assign directly to the doctor.",
    actions: [
      { type: "do", text: "In the New EHR Task dialog, click Add next to the Assign To field." },
      { type: "do", text: "Search for and select the correct clinical team (e.g., 'Abadeer Clinical Team', 'Bailey Clinical Team')." },
      { type: "warning", text: "NEVER assign directly to the doctor. Always assign to the clinical team — they triage and route messages to the provider." },
      { type: "why", text: "Assigning directly to a doctor bypasses the clinical team's triage process and may result in delays or missed messages." },
    ],
  },
  {
    number: 11,
    title: "Send the Task",
    subtitle: "Click Send Task and Confirm the Recipient",
    image: guideImg("clinical", "step-02.png"),
    imageAlt: "Clinical Message Step-by-Step — Step 11: Send Task button in New EHR Task dialog and confirmation table showing Employee, Recipient (Bailey Clinical Team), and Encounter",
    intro: "With the task assigned to the correct clinical team, click 'Send Task' to submit the message. A confirmation table will appear showing the Employee, Recipient, and Encounter — verify this before closing.",
    actions: [
      { type: "action", text: "Click the 'Send Task' button at the bottom of the New EHR Task dialog." },
      { type: "do", text: "Confirm the recipient table shows the correct clinical team in the Recipient column." },
      { type: "do", text: "Verify the Encounter and other details are correct." },
      { type: "action", text: "The task is now sent. Close the dialog and inform the patient that their message has been passed to the clinical team." },
      { type: "tip", text: "Tell the patient: 'I've passed your message to the clinical team. A member of the team will follow up with you — please allow [X business days] for a response.'" },
      { type: "tip", text: "Log your call in Talkdesk with the appropriate disposition code (e.g., 'Clinical Message Sent') before ending the call." },
    ],
  },
];

// ── NextGen PM Steps ──────────────────────────────────────────────────────────
const nextgenSteps: Step[] = [
  {
    number: 1,
    title: "Open Enterprise PM",
    subtitle: "Launch the Practice Management System",
    image: guideImg("scheduling", "step-01.png"),
    imageAlt: "NextGen – Borland Groover main screen after launch — blank gray work area with blue toolbar",
    intro: "When you open NextGen from Citrix you will see a blank gray screen with a blue icon toolbar running across the top. This is your starting point for all scheduling, patient lookup, and demographics work.",
    actions: [
      { type: "do", text: "Locate and launch NextGen Enterprise PM from your Citrix desktop — look for 'Enterprise PM', not 'Enterprise EHR'." },
      { type: "why", text: "Enterprise PM is the Practice Management module. All patient scheduling, lookup, and demographics are handled here." },
      { type: "tip", text: "If you see both Enterprise EHR and Enterprise PM in the launcher, always pick PM for scheduling and chart lookups." },
    ],
  },
  {
    number: 2,
    title: "Open Patient Lookup",
    subtitle: "Open the Patient Search Window",
    image: guideImg("scheduling", "step-02.png"),
    imageAlt: "Patient Lookup dialog box with blank fields — Last, First/Preferred, Middle, Birth Date, Phone",
    intro: "Once Enterprise PM loads you will see the blank work area. Click the Chart icon (clipboard with a person) in the top blue toolbar to open the Patient Lookup dialog.",
    actions: [
      { type: "do", text: "Click the Chart icon in the top toolbar — it resembles a clipboard with a person icon." },
      { type: "why", text: "The Patient Lookup dialog lets you search for any patient in the system using name, DOB, phone, or other identifiers." },
      { type: "tip", text: "Keyboard shortcut: Ctrl+L opens the Patient Lookup dialog directly." },
    ],
  },
  {
    number: 3,
    title: "Enter Patient Details",
    subtitle: "Search for the Patient by Name and DOB",
    image: guideImg("scheduling", "step-03.png"),
    imageAlt: "Patient Lookup with 'Ellis' in Last field and '07/15/1965' in Birth Date field",
    intro: "Type the patient's last name and date of birth in the search fields, then click Find. You don't need to fill every field — last name + DOB is sufficient for most lookups.",
    actions: [
      { type: "do", text: "Type the patient's last name in the 'Last' field." },
      { type: "do", text: "Type the date of birth in 'Birth Date' (format: MM/DD/YYYY)." },
      { type: "action", text: "Click Find to run the search." },
      { type: "tip", text: "If you get too many results, add the first name or phone number to narrow it down." },
    ],
  },
  {
    number: 4,
    title: "Select & Open Patient Chart",
    subtitle: "Verify Identity and Open the Record",
    image: guideImg("scheduling", "step-04.png"),
    imageAlt: "Patient Lookup showing Ellis, Taylor highlighted in blue in Matching Records — Open button visible at bottom right",
    intro: "Matching patients appear in the Matching Records list. Always verify name, DOB, and address before opening — there may be patients with similar names.",
    actions: [
      { type: "do", text: "Review the Matching Records section — verify Name, Birth Date, and Address match your patient." },
      { type: "do", text: "Click the correct patient row to highlight it in blue." },
      { type: "action", text: "Click the Open button (bottom right) to open the full patient chart." },
      { type: "warning", text: "If multiple matches appear, verify additional details with the caller (e.g., last 4 of SSN or full address) before opening." },
    ],
  },
  {
    number: 5,
    title: "Navigate the Patient Chart",
    subtitle: "Explore the Chart Tabs and Sections",
    image: guideImg("scheduling", "step-05.png"),
    imageAlt: "Patient chart for Ellis, Taylor — Demographics tab active showing contact info, PCP, insurance, and bottom navigation tabs",
    intro: "The patient chart opens to the Demographics view. Use the tabs across the screen to navigate different sections of their record.",
    actions: [
      { type: "do", text: "Confirm patient identity from the Demographics tab — name, DOB, PCP, and contact info." },
      { type: "tip", text: "Always verify the patient's details on this screen before proceeding with any action." },
    ],
    tabs: [
      { label: "Demographics (Default)", description: "Opens first. Shows full address, PCP, age, phone numbers, and preferred pharmacy. Always confirm key info here first." },
      { label: "Clinical History / Notes", description: "Opens the clinical tree on the left. Navigate subcategories including appointments, diagnoses, medications, test results, and clinical notes." },
      { label: "Financial", description: "Displays billing information, insurance plans, and account balance." },
      { label: "Encounters", description: "Shows the patient's full appointment and visit history with provider and location details." },
    ],
  },
];

// ── Talkdesk Steps ───────────────────────────────────────────────────────────
const talkdeskSteps: Step[] = [
  {
    number: 1,
    title: "Open Talkdesk & Log In",
    subtitle: "Launch the Talkdesk Agent Desktop",
    image: navImg("talkdesk_Screenshot_2026-06-09_163052.png"),
    imageAlt: "Talkdesk login screen — enter your credentials to access the agent desktop",
    intro: "Talkdesk is BG's cloud-based call center platform. You must be logged in and set to 'Available' status before you can receive calls.",
    actions: [
      { type: "do", text: "Navigate to the Talkdesk URL or click the Talkdesk shortcut on your Citrix desktop." },
      { type: "do", text: "Enter your Talkdesk email and password credentials, then click Sign In." },
      { type: "tip", text: "Use your BG-provided Talkdesk credentials — do not share your login with anyone." },
      { type: "warning", text: "If you cannot log in, contact your supervisor — do not attempt multiple failed logins as this may lock your account." },
    ],
  },
  {
    number: 2,
    title: "Navigate the Agent Desktop",
    subtitle: "Understand the Main Interface",
    image: navImg("talkdesk_Screenshot_2026-06-09_163124.png"),
    imageAlt: "Talkdesk agent desktop showing the main interface panels",
    intro: "Once logged in, you'll see the Talkdesk Agent Desktop with the status bar at the top, the call queue panel on the left, and the active call area in the center.",
    actions: [
      { type: "do", text: "Familiarize yourself with the top status bar — this shows your current availability status and your name." },
      { type: "do", text: "Locate the left navigation panel — this includes Calls, Contacts, and Activity feeds." },
      { type: "why", text: "Understanding the interface layout helps you navigate quickly during live calls without putting patients on hold." },
      { type: "tip", text: "The softphone dial pad is accessible from the phone icon — you'll use this for outbound calls and transfers." },
    ],
  },
  {
    number: 3,
    title: "Set Your Status to Available",
    subtitle: "Go Ready to Receive Calls",
    image: navImg("talkdesk_Screenshot_2026-06-09_163219.png"),
    imageAlt: "Talkdesk status dropdown showing Available, Busy, Break, and other status options",
    intro: "Your status controls whether calls route to you. You must be 'Available' to receive inbound calls.",
    actions: [
      { type: "do", text: "Click your current status indicator at the top of the screen." },
      { type: "do", text: "Select 'Available' from the dropdown." },
      { type: "action", text: "Confirm your status shows green/Available before the start of your shift." },
      { type: "warning", text: "Never stay in 'Away' or 'Break' when you are ready to take calls — this reduces team capacity and affects your adherence score." },
    ],
  },
  {
    number: 4,
    title: "Answer an Incoming Call",
    subtitle: "Respond to Inbound Calls",
    image: navImg("talkdesk_Screenshot_2026-06-09_163238.png"),
    imageAlt: "Talkdesk incoming call popup showing patient caller info and Accept/Decline buttons",
    intro: "When a call comes in, a notification pops up with the caller's phone number and queue name. Answer within the target ring time.",
    actions: [
      { type: "do", text: "Click the green 'Accept' button when the incoming call popup appears." },
      { type: "do", text: "Greet the caller: 'Thank you for calling Borland Groover, this is [name]. How can I assist you today?'" },
      { type: "tip", text: "Pull up NextGen PM before or immediately after answering so you can search the patient chart while speaking." },
      { type: "warning", text: "Do NOT let calls ring to voicemail unless you are in a status that allows it (Break, Lunch, etc.)." },
    ],
  },
  {
    number: 5,
    title: "Use Hold & Mute During Calls",
    subtitle: "Manage Active Call Controls",
    image: navImg("talkdesk_Screenshot_2026-06-09_163731.png"),
    imageAlt: "Talkdesk active call screen showing Hold, Mute, Transfer, and Keypad buttons",
    intro: "During an active call you have Hold, Mute, Transfer, and other controls. Know the difference between Hold and Mute.",
    actions: [
      { type: "do", text: "Click 'Hold' to place a patient on hold with hold music — use when researching or consulting a supervisor." },
      { type: "do", text: "Click 'Mute' to silence your microphone — the patient can still hear any background audio." },
      { type: "action", text: "Always tell the patient before holding: 'I'm going to place you on a brief hold — I'll be right back.'" },
      { type: "tip", text: "Check back with the patient every 2 minutes if on hold — never exceed 3 minutes without checking in." },
      { type: "warning", text: "Do NOT use Mute as a substitute for Hold — use Hold for extended pauses." },
    ],
  },
  {
    number: 6,
    title: "Transfer a Call (Warm Transfer)",
    subtitle: "Hand Off a Call to Another Department",
    image: navImg("talkdesk_Screenshot_2026-06-09_163824.png"),
    imageAlt: "Talkdesk transfer screen showing warm transfer and blind transfer options with department search",
    intro: "Warm transfers are the standard at BG — call the receiving department, introduce the patient, then complete the transfer.",
    actions: [
      { type: "do", text: "Click the 'Transfer' button on the active call panel." },
      { type: "do", text: "Search for the destination department/queue in the transfer search box." },
      { type: "do", text: "Select the destination and click 'Call' to ring the receiving agent while the patient is on hold." },
      { type: "action", text: "When the agent answers, introduce the patient: 'Hi, I have [Patient Name] calling about [reason]. Transferring now.'" },
      { type: "action", text: "Click 'Complete Transfer' to connect the patient and drop off." },
      { type: "tip", text: "If no answer within 30 seconds, return to the patient and advise them — do not abandon the call." },
    ],
  },
  {
    number: 7,
    title: "View Caller History & Notes",
    subtitle: "Review Past Interactions",
    image: navImg("talkdesk_Screenshot_2026-06-09_163840.png"),
    imageAlt: "Talkdesk contact history panel showing previous call records and notes",
    intro: "Talkdesk keeps a history of previous calls for each phone number. Reviewing past interactions gives context before you ask the patient to repeat themselves.",
    actions: [
      { type: "do", text: "Click the caller's name or number to open their contact profile." },
      { type: "do", text: "Review the call history panel for recent interactions." },
      { type: "do", text: "Read any notes left by previous agents." },
      { type: "tip", text: "Cross-reference Talkdesk history with the patient chart in NextGen for a complete picture." },
    ],
  },
  {
    number: 8,
    title: "Add Call Notes in Talkdesk",
    subtitle: "Document the Call While Active",
    image: navImg("talkdesk_Screenshot_2026-06-09_163850.png"),
    imageAlt: "Talkdesk notes field during active call for adding real-time documentation",
    intro: "Add notes to a call while active or after it ends. Notes are tied to the call record and visible to supervisors and QA.",
    actions: [
      { type: "do", text: "Locate the 'Notes' field in the active call panel." },
      { type: "do", text: "Type brief, professional notes: reason for call, action taken, transfers made." },
      { type: "action", text: "Save/submit notes before ending the call or during wrap-up." },
      { type: "tip", text: "Keep notes factual and professional — they are part of the permanent record." },
      { type: "warning", text: "Do NOT include detailed PHI in Talkdesk notes — detailed clinical notes go in NextGen, not Talkdesk." },
    ],
  },
  {
    number: 9,
    title: "End the Call Properly",
    subtitle: "Hang Up and Enter Wrap-Up Mode",
    image: navImg("talkdesk_Screenshot_2026-06-09_163858.png"),
    imageAlt: "Talkdesk end call button and wrap-up mode screen",
    intro: "After ending the call, Talkdesk enters Wrap-Up mode giving you time to finalize notes and select a disposition.",
    actions: [
      { type: "do", text: "Click the red 'End Call' button to terminate the active call." },
      { type: "do", text: "You will enter Wrap-Up mode automatically — a countdown timer may appear." },
      { type: "action", text: "Use wrap-up time to: finalize Talkdesk notes, update the NextGen chart, and select a disposition code." },
      { type: "warning", text: "Do not extend wrap-up time unnecessarily — prolonged ACW impacts your AHT metric." },
    ],
  },
  {
    number: 10,
    title: "Select a Disposition Code",
    subtitle: "Log the Call Outcome",
    image: navImg("talkdesk_Screenshot_2026-06-09_163913.png"),
    imageAlt: "Talkdesk disposition code dropdown showing all available call outcome options",
    intro: "A disposition code classifies the outcome of each call. Select the most accurate code before exiting wrap-up mode.",
    actions: [
      { type: "do", text: "In the Wrap-Up screen, find the 'Disposition' dropdown." },
      { type: "do", text: "Select the code that best describes the call outcome (e.g., Appointment Scheduled, Transferred to Billing, Voicemail Left)." },
      { type: "action", text: "Click Save/Submit to log the disposition and close the call record." },
      { type: "tip", text: "Refer to the Disposition Codes page in this app for full definitions of all codes." },
      { type: "warning", text: "Do not always default to 'General Inquiry' — be specific. Accurate dispositions improve reporting and QA scoring." },
    ],
  },
  {
    number: 11,
    title: "Make an Outbound Call",
    subtitle: "Dial Out for Callbacks",
    image: navImg("talkdesk_Screenshot_2026-06-09_163925.png"),
    imageAlt: "Talkdesk dialpad for making outbound calls",
    intro: "Use Talkdesk for all outbound calls — callbacks, confirmations, or follow-ups. Never use personal phones for BG calls.",
    actions: [
      { type: "do", text: "Click the phone/dialpad icon to open the outbound dial screen." },
      { type: "do", text: "Enter the patient's 10-digit phone number (no dashes) or search by contact name." },
      { type: "action", text: "Click the green 'Call' button to initiate the call." },
      { type: "do", text: "Identify yourself: 'Hello, this is [Name] calling from Borland Groover returning your call…'" },
      { type: "tip", text: "Always review the patient's chart in NextGen before calling back to know the context." },
    ],
  },
  {
    number: 12,
    title: "View Your Activity & Metrics",
    subtitle: "Monitor Your Daily Performance",
    image: navImg("talkdesk_Screenshot_2026-06-09_163946.png"),
    imageAlt: "Talkdesk activity dashboard showing call count, AHT, handle time, and availability metrics",
    intro: "Talkdesk provides real-time performance metrics. Check regularly to monitor your AHT, calls handled, and availability.",
    actions: [
      { type: "do", text: "Click 'Activity' or 'My Stats' in the left navigation panel." },
      { type: "do", text: "Review: total calls handled, average handle time (goal: 6 min), availability % (goal: 90%+)." },
      { type: "tip", text: "If AHT is trending high, identify whether it's talk time or ACW driving it and adjust accordingly." },
      { type: "tip", text: "Your supervisor can see these metrics in real time." },
    ],
  },
];

// ── Citrix Steps ─────────────────────────────────────────────────────────────
const citrixSteps: Step[] = [
  {
    number: 1,
    title: "Open Citrix Workspace",
    subtitle: "Launch the Virtual Desktop Environment",
    image: navImg("citrix_Screenshot_2026-06-09_164337.png"),
    imageAlt: "Citrix Workspace login and launch screen",
    intro: "Citrix Workspace is the virtual desktop environment that hosts all BG applications including NextGen and Talkdesk. You must connect to Citrix before accessing any BG system.",
    actions: [
      { type: "do", text: "Click the Citrix Workspace icon on your desktop or navigate to the BG Citrix web URL." },
      { type: "do", text: "Enter your BG Active Directory username and password." },
      { type: "action", text: "Click Log On to authenticate and load your virtual desktop." },
      { type: "tip", text: "If your Citrix session has timed out, close the browser tab, reopen, and log in fresh." },
      { type: "warning", text: "Never share your Citrix login credentials — each login is tied to HIPAA audit trails." },
    ],
  },
  {
    number: 2,
    title: "Launch Applications from Citrix",
    subtitle: "Open NextGen, Talkdesk, and Other Tools",
    image: navImg("citrix_Screenshot_2026-06-09_164504.png"),
    imageAlt: "Citrix application launcher showing BG applications including NextGen Enterprise PM",
    intro: "Once logged into Citrix, access the application launcher to open NextGen Enterprise PM and Talkdesk.",
    actions: [
      { type: "do", text: "Locate NextGen Enterprise PM in the Citrix app launcher and double-click to launch it." },
      { type: "do", text: "Locate and open Talkdesk the same way if it's accessed through Citrix." },
      { type: "tip", text: "Arrange windows side-by-side: NextGen on one side, Talkdesk on the other — this lets you work in both simultaneously." },
      { type: "tip", text: "If an app fails to launch, close and try again. If still failing, log out of Citrix and back in." },
    ],
  },
  {
    number: 3,
    title: "Handle Citrix Screen & Display",
    subtitle: "Optimize Your Virtual Desktop View",
    image: navImg("citrix_Screenshot_2026-06-09_164614.png"),
    imageAlt: "Citrix virtual desktop showing fullscreen mode and display options toolbar",
    intro: "The Citrix virtual desktop can run in window or full-screen mode. Full-screen gives you maximum space for NextGen and Talkdesk.",
    actions: [
      { type: "do", text: "To enter full-screen: hover at the top of the screen for the Citrix toolbar, then click the full-screen icon." },
      { type: "do", text: "To exit full-screen: hover at the top again and click the restore icon, or press Ctrl+F2." },
      { type: "tip", text: "If your Citrix session appears frozen, try moving the mouse — sometimes it's a display refresh lag." },
      { type: "warning", text: "Do NOT click the X to close the Citrix window unless you intend to end your session — use Disconnect to keep your session active." },
    ],
  },
  {
    number: 4,
    title: "Disconnect vs. Log Off Citrix",
    subtitle: "Properly End Your Session",
    image: navImg("citrix_Screenshot_2026-06-09_164824.png"),
    imageAlt: "Citrix session end options showing Disconnect and Log Off choices",
    intro: "Disconnect leaves your session running in the background. Log Off ends your session completely. Use the right option for the situation.",
    actions: [
      { type: "do", text: "End of shift: Log Off completely from the Start Menu inside Citrix." },
      { type: "do", text: "Short break (lunch, 15 min): Disconnect — your session stays active and resumes when you return." },
      { type: "action", text: "Before disconnecting/logging off: set Talkdesk to 'Away' or 'Break' — do NOT leave yourself as 'Available' while away." },
      { type: "tip", text: "Always save work in NextGen before ending the Citrix session to avoid losing unsaved changes." },
      { type: "warning", text: "Never leave your Citrix session connected and unattended overnight — log off completely at end of shift." },
    ],
  },
];

type SystemTab = "scheduling" | "rescheduling" | "clinical" | "nextgen" | "talkdesk" | "citrix";

const tabs: { id: SystemTab; label: string; icon: typeof Monitor; steps: Step[]; desc: string }[] = [
  { id: "scheduling", label: "Scheduling", icon: Calendar, steps: schedulingSteps, desc: "New appointment scheduling in NextGen PM — step-by-step with real screenshots" },
  { id: "rescheduling", label: "Rescheduling", icon: RefreshCw, steps: reschedulingSteps, desc: "Rescheduling existing appointments in NextGen PM — step-by-step with real screenshots" },
  { id: "clinical", label: "Clinical Messaging", icon: MessageSquare, steps: clinicalSteps, desc: "Sending clinical messages through NextGen EHR — step-by-step workflow" },
  { id: "nextgen", label: "NextGen PM", icon: Monitor, steps: nextgenSteps, desc: "Find & open patient charts in NextGen Enterprise PM" },
  { id: "talkdesk", label: "Talkdesk", icon: Phone, steps: talkdeskSteps, desc: "Call center platform — calls, transfers, dispositions" },
  { id: "citrix", label: "Citrix", icon: Server, steps: citrixSteps, desc: "Virtual desktop access — launch and manage BG apps" },
];

function StepViewer({ steps }: { steps: Step[] }) {
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;

  return (
    <div className="space-y-4">
      {/* Step Progress Bar */}
      <div className="flex items-center gap-1.5">
        {steps.map((s, i) => (
          <button key={s.number} onClick={() => setCurrent(i)} className="flex-1 group">
            <div className={cn("h-1.5 rounded-full transition-all", i <= current ? "bg-primary" : "bg-border")} />
            <span className={cn(
              "text-xs mt-1.5 block text-center font-medium transition-colors",
              i === current ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
              steps.length > 12 ? "hidden sm:block" : ""
            )}>
              {i + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Step Card */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left — Screenshot */}
        <div className="space-y-3">
          <div className="rounded-xl overflow-hidden border border-border shadow-sm bg-muted/30">
            <img src={step.image} alt={step.imageAlt} className="w-full object-cover" />
          </div>
          <p className="text-xs text-muted-foreground text-center italic">{step.imageAlt}</p>
        </div>

        {/* Right — Instructions */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                {step.number}
              </span>
              <div>
                <h2 className="text-lg font-bold text-foreground leading-tight">{step.title}</h2>
                <p className="text-xs text-muted-foreground">{step.subtitle}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.intro}</p>
          </div>

          <div className="space-y-2">
            {step.actions.map((action, i) => {
              const cfg = actionConfig[action.type];
              const Icon = cfg.icon;
              return (
                <div key={i} className={cn("flex items-start gap-3 border rounded-lg px-3 py-2.5 text-sm", cfg.color)}>
                  <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold mr-1">{cfg.label}:</span>
                    <span>{action.text}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {step.tabs && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Chart Navigation Tabs</p>
              {step.tabs.map((tab, i) => (
                <div key={i} className="border border-border rounded-lg p-3 bg-card">
                  <p className="text-sm font-semibold text-foreground mb-1">{tab.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tab.description}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" size="sm" onClick={() => setCurrent((c) => c - 1)} disabled={isFirst} className="gap-1.5">
              <ChevronLeft className="w-3.5 h-3.5" />
              Previous
            </Button>
            <span className="text-xs text-muted-foreground">Step {current + 1} of {steps.length}</span>
            <Button size="sm" onClick={() => setCurrent((c) => c + 1)} disabled={isLast} className="gap-1.5">
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">All Steps</p>
        <div className={cn(
          "grid gap-3",
          steps.length <= 5 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" :
          steps.length <= 12 ? "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6" :
          "grid-cols-4 sm:grid-cols-5 lg:grid-cols-7"
        )}>
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "rounded-xl border-2 overflow-hidden text-left transition-all hover:shadow-md",
                i === current ? "border-primary shadow-md" : "border-border hover:border-primary/40"
              )}
            >
              <div className="relative">
                <img src={s.image} alt={`Step ${s.number} thumbnail`} className="w-full aspect-video object-cover object-top" />
                {i < current && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                )}
                {i === current && (
                  <div className="absolute top-1.5 left-1.5">
                    <span className="text-xs bg-primary text-primary-foreground font-bold px-1.5 py-0.5 rounded">Now</span>
                  </div>
                )}
              </div>
              <div className="p-2 bg-card">
                <p className="text-xs font-semibold text-foreground truncate">Step {s.number}</p>
                <p className="text-xs text-muted-foreground truncate">{s.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SystemNav() {
  const [activeTab, setActiveTab] = useState<SystemTab>("scheduling");
  const activeTabData = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="space-y-6" data-testid="systemnav-page">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <Monitor className="w-5 h-5 text-primary" />
          System Navigation Guide
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Step-by-step visual guides for Scheduling, Rescheduling, Clinical Messaging, NextGen PM, Talkdesk, and Citrix
        </p>
      </div>

      {/* System Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded-full font-bold",
                activeTab === tab.id ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {tab.steps.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Description */}
      <p className="text-sm text-muted-foreground">{activeTabData.desc}</p>

      {/* Step Viewer — re-mount on tab change to reset state */}
      <StepViewer key={activeTab} steps={activeTabData.steps} />
    </div>
  );
}
