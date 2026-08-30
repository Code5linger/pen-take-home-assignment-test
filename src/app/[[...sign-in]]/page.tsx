'use client';

import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const router = useRouter();

  const role = user?.publicMetadata.role;

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    if (role) {
      router.push(`/${role}`);
    }
  }, [isLoaded, isSignedIn, user, router, role]);

  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Show message if user is signed in but has no role
  if (isSignedIn && !role) {
    return (
      <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
        <div className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-4">
          <h1 className="text-xl font-bold">No Role Assigned</h1>
          <p className="text-gray-600">
            Your account does not have a role assigned. Please contact an administrator to assign a role (admin, teacher, student, or parent).
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white rounded-md text-sm p-[10px] hover:bg-blue-600"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  // Don't show sign-in form if already signed in (will redirect via useEffect)
  if (isSignedIn) {
    return null;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="" width={24} height={24} />
            SchooLama
          </h1>
          <h2 className="text-gray-400">Sign in to your account</h2>
          <Clerk.GlobalError className="text-sm text-red-400" />
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;

// 'use client';

// import * as Clerk from '@clerk/elements/common';
// import * as SignIn from '@clerk/elements/sign-in';
// import Image from 'next/image';

// export default function LoginPage() {
//   return (
//     <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
//       <SignIn.Root>
//         {/* Identifier */}
//         <SignIn.Step
//           name="start"
//           className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//         >
//           <h1 className="text-xl font-bold flex items-center gap-2">
//             <Image src="/logo.png" alt="SchooLama" width={24} height={24} />
//             SchooLama
//           </h1>

//           <h2 className="text-gray-400">Sign in to your account</h2>

//           <Clerk.GlobalError className="text-sm text-red-400" />

//           <Clerk.Field name="identifier" className="flex flex-col gap-2">
//             <Clerk.Label className="text-xs text-gray-500">
//               Username
//             </Clerk.Label>

//             <Clerk.Input
//               type="text"
//               required
//               className="p-2 rounded-md ring-1 ring-gray-300"
//             />

//             <Clerk.FieldError className="text-xs text-red-400" />
//           </Clerk.Field>

//           <SignIn.Action
//             submit
//             className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
//           >
//             Continue
//           </SignIn.Action>
//         </SignIn.Step>

//         {/* Password */}
//         <SignIn.Step
//           name="verifications"
//           className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//         >
//           <h1 className="text-xl font-bold flex items-center gap-2">
//             <Image src="/logo.png" alt="SchooLama" width={24} height={24} />
//             SchooLama
//           </h1>

//           <h2 className="text-gray-400">Enter your password</h2>

//           <Clerk.GlobalError className="text-sm text-red-400" />

//           <SignIn.Strategy name="password">
//             <Clerk.Field name="password" className="flex flex-col gap-2">
//               <Clerk.Label className="text-xs text-gray-500">
//                 Password
//               </Clerk.Label>

//               <Clerk.Input
//                 type="password"
//                 required
//                 className="p-2 rounded-md ring-1 ring-gray-300"
//               />

//               <Clerk.FieldError className="text-xs text-red-400" />
//             </Clerk.Field>

//             <SignIn.Action
//               submit
//               className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
//             >
//               Sign In
//             </SignIn.Action>
//           </SignIn.Strategy>
//         </SignIn.Step>
//       </SignIn.Root>
//     </div>
//   );
// }

// 'use client';

// import { SignIn } from '@clerk/nextjs';

// export default function LoginPage() {
//   return (
//     <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
//       <SignIn />
//     </div>
//   );
// }

// import { SignIn } from '@clerk/nextjs';

// export default function SignInPage() {
//   return <SignIn />;
// }

// 'use client';

// import * as Clerk from '@clerk/elements/common';
// import * as SignIn from '@clerk/elements/sign-in';
// import { useUser } from '@clerk/nextjs';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// const LoginPage = () => {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const router = useRouter();

//   // useEffect(() => {
//   //   if (!isLoaded || !isSignedIn || !user) return;

//   //   const role = user.publicMetadata.role;

//   //   console.log('SIGNED IN');
//   //   console.log('USER:', user);
//   //   console.log('ROLE:', role);

//   //   if (role) {
//   //     router.replace(`/${role}`);
//   //   } else {
//   //     router.replace('/');
//   //   }
//   // }, [isLoaded, isSignedIn, user, router]);

//   useEffect(() => {
//     if (!isLoaded || !isSignedIn || !user) return;

//     const role = user.publicMetadata.role;

//     console.log('ROLE:', role);

//     if (!role) {
//       console.error('User has no role!');
//       router.replace('/test');
//       return;
//     }

//     router.replace(`/${role}`);
//   }, [isLoaded, isSignedIn, user, router]);

//   // Clerk is still loading
//   if (!isLoaded) {
//     return null;
//   }

//   // Already authenticated.
//   // Wait for the useEffect redirect.
//   if (isSignedIn) {
//     return null;
//   }

//   return (
//     <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
//       <SignIn.Root>
//         <SignIn.Step
//           name="start"
//           className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
//         >
//           <h1 className="text-xl font-bold flex items-center gap-2">
//             <Image src="/logo.png" alt="SchooLama" width={24} height={24} />
//             SchooLama
//           </h1>

//           <h2 className="text-gray-400">Sign in to your account</h2>

//           <Clerk.GlobalError className="text-sm text-red-400" />

//           <Clerk.Field name="identifier" className="flex flex-col gap-2">
//             <Clerk.Label className="text-xs text-gray-500">
//               Username
//             </Clerk.Label>

//             <Clerk.Input
//               type="text"
//               required
//               className="p-2 rounded-md ring-1 ring-gray-300"
//             />

//             <Clerk.FieldError className="text-xs text-red-400" />
//           </Clerk.Field>

//           <Clerk.Field name="password" className="flex flex-col gap-2">
//             <Clerk.Label className="text-xs text-gray-500">
//               Password
//             </Clerk.Label>

//             <Clerk.Input
//               type="password"
//               required
//               className="p-2 rounded-md ring-1 ring-gray-300"
//             />

//             <Clerk.FieldError className="text-xs text-red-400" />
//           </Clerk.Field>

//           <SignIn.Action
//             submit
//             className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
//           >
//             Sign In
//           </SignIn.Action>
//         </SignIn.Step>
//       </SignIn.Root>
//     </div>
//   );
// };

// export default LoginPage;
