# TODO: Debug and Fix Language Selector in Govt Dashboard

## Steps from Approved Plan

1. **[x] Edit DHRFrontend/components/dynamic-header.tsx**
   - Add children prop to the DynamicHeader component.
   - Replace the hardcoded language DropdownMenu with {children} in the right side controls section.
   - Ensure styling and responsiveness are maintained (e.g., gap-4 in flex items).
   - Remove or comment out the hardcoded selector to prevent duplication.

2. **[ ] Verify layout.tsx integration**
   - Confirm <DynamicHeader><LanguageSelector /></DynamicHeader> passes children correctly (no changes needed).

3. **[ ] Restart development server**
   - Execute: cd DHRFrontend && npm run dev
   - Confirm server is running without errors.

4. **[ ] Test the fix using browser**
   - Launch browser at http://localhost:3000/dashboard/govt
   - Verify LanguageSelector renders in header.
   - Click the button to open dropdown.
   - Select a different language (e.g., Hindi) and confirm:
     - Page text updates (e.g., "Population Overview" changes to Hindi equivalent).
     - No console errors on language change.
   - Navigate to a subpage (e.g., /dashboard/govt/disease-surveillance) and verify translations persist.
   - Test mobile view if possible (scroll or resize).

5. **[ ] Update TODO.md**
   - Mark completed steps as [x].

6. **[ ] Complete task**
   - Use attempt_completion once verified.
