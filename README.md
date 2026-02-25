
# MadMatrix '26 Ticket Hub

Authorized ticket retrieval portal for MadMatrix 2026. This application is built with Next.js, Tailwind CSS, and Genkit AI.

1. Neural Authorization (The Entry Point)
The system begins with a secure credential check.

Email Validation: The user enters their registered email ID into the portal's initial input field.

The Rocket Launch: To prevent accidental submissions and create a modern "launch" feel, users must drag a Rocket Icon (🚀) across a track to trigger the system search.

Database Search: Upon sliding, the system queries the backend (connected to your Excel/JSON data) to find a matching record.

2. Bio-Sync & Data Stream
Once the email is verified, the system undergoes a "Neural Decryption" process to show student-specific data.

System Decryption: A loading interface appears (Status: [RETRIVING_DATA...]) while the system pulls specific fields like Attendee Name, Register Number, and Participating Event.

Neural Stream Display: Instead of old-fashioned tables, the user’s identity is revealed through glowing data nodes: [IDENT_SYNC], [ASSIGNED_PROTOCOL], and [DEPLOYMENT_ZONE].

3. The Permit Engine (Ticket Generation)
The final stage is the generation of a high-fidelity entry permit.

Coordinate Locking: The system uses a specialized script to "lock" the text (Name, Event, Date) into fixed pixel coordinates. This ensures that even on mobile, the text never overlaps the QR code or the "Verified User" status stamps.

Secure QR Generation: A unique QR code is rendered on the right side of the permit, which is intended for on-site scanning to verify "Entry Granted" status.

High-Res Export: The DOWNLOAD_PERMIT_V1.0 button uses a 3x scaling factor to ensure the final PNG is sharp enough for physical printing or mobile scanning.
