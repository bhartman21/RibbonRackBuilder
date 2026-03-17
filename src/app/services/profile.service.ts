import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc, getDoc, Timestamp } from '@angular/fire/firestore';
import { UserRackProfile } from '../models/ribbon.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private firestore = inject(Firestore);
  private profileCollection = collection(this.firestore, 'ribbon-profiles');

  async saveProfile(profile: Omit<UserRackProfile, 'updatedAt'>): Promise<void> {
    const profileDoc = doc(this.profileCollection, profile.profileId);
    await setDoc(profileDoc, {
      ...profile,
      updatedAt: Timestamp.now()
    }, { merge: true });
  }

  async getProfile(profileId: string): Promise<UserRackProfile | null> {
    const profileDoc = doc(this.profileCollection, profileId);
    const docSnap = await getDoc(profileDoc);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserRackProfile;
    }
    return null;
  }
}
