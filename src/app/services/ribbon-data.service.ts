import { Injectable } from '@angular/core';
import { Ribbon } from '../models/ribbon.model';

@Injectable({ providedIn: 'root' })
export class RibbonDataService {

  /**
   * All 50 MCL/MODD ribbons in order of precedence per the 2023 Ribbon Chart.
   * CSS gradients are used to recreate each ribbon's stripe pattern.
   * Orientation and special device rules per Enclosure 4.
   */
  readonly ribbons: Ribbon[] = [
    // ── Row 1: Hero & Distinguished ──
    {
      id: 1, name: 'MCL Hero Medal', shortName: 'Hero Medal',
      category: 'mcl',
      imageUrl: '01_MCL_Hero_Medal.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 15%, #FFD700 15%, #FFD700 30%, #FFFFFF 30%, #FFFFFF 50%, #FFD700 50%, #FFD700 65%, #CC0000 65%, #CC0000 80%, #000000 80%, #000000 100%)',
      starType: 'gold_5_16'
    },
    {
      id: 2, name: 'MCL Distinguished Citizen — Gold Medal', shortName: 'Distinguished Citizen Gold',
      category: 'mcl',
      imageUrl: '02_MCL_Distinguished_Citizen_-_Gold_Medal.png',
      cssGradient: 'linear-gradient(to right, #FFD700 0%, #FFD700 10%, #FFFFFF 10%, #FFFFFF 20%, #006B3F 20%, #006B3F 40%, #CC0000 40%, #CC0000 60%, #FFD700 60%, #FFD700 70%, #FFFFFF 70%, #FFFFFF 80%, #003366 80%, #003366 100%)',
      starType: 'gold_5_16',
      orientation: 'blue_inboard'
    },
    {
      id: 3, name: 'MCL Distinguished Citizen — Silver Medal', shortName: 'Distinguished Citizen Silver',
      category: 'mcl',
      imageUrl: '03_MCL_Distinguished_Citizen_-_Silver_Medal.png',
      cssGradient: 'linear-gradient(to right, #C0C0C0 0%, #C0C0C0 10%, #FFFFFF 10%, #FFFFFF 20%, #006B3F 20%, #006B3F 40%, #CC0000 40%, #CC0000 60%, #006B3F 60%, #006B3F 80%, #FFFFFF 80%, #FFFFFF 90%, #C0C0C0 90%, #C0C0C0 100%)',
      starType: 'gold_5_16'
    },
    {
      id: 4, name: 'MCL Distinguished Citizen — Bronze Medal', shortName: 'Distinguished Citizen Bronze',
      category: 'mcl',
      imageUrl: '04_MCL_Distinguished_Citizen_-_Bronze_Medal.png',
      cssGradient: 'linear-gradient(to right, #CD7F32 0%, #CD7F32 10%, #FFFFFF 10%, #FFFFFF 20%, #006B3F 20%, #006B3F 40%, #CC0000 40%, #CC0000 60%, #006B3F 60%, #006B3F 80%, #FFFFFF 80%, #FFFFFF 90%, #CD7F32 90%, #CD7F32 100%)',
      starType: 'gold_5_16'
    },
    {
      id: 5, name: 'MCL Distinguished Service — Bronze Medal', shortName: 'Distinguished Service Bronze',
      category: 'mcl',
      imageUrl: '05_MCL_Distinguished_Service_-_Bronze_Medal.png',
      cssGradient: 'linear-gradient(to right, #8B0000 0%, #8B0000 15%, #FFD700 15%, #FFD700 30%, #000080 30%, #000080 50%, #FFFFFF 50%, #FFFFFF 60%, #000080 60%, #000080 70%, #FFD700 70%, #FFD700 85%, #8B0000 85%, #8B0000 100%)',
      starType: 'gold_5_16'
    },

    // ── Row 2: Marine / Associate of the Year ──
    {
      id: 6, name: 'MCL Marine of the Year Ribbon — National', shortName: 'MOY National',
      category: 'mcl',
      imageUrl: '06_MCL_Marine_of_the_Year_Ribbon_-_National.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 8%, #FFD700 8%, #FFD700 92%, #CC0000 92%, #CC0000 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 7, name: 'MCL Associate Member of the Year Ribbon — National', shortName: 'AMOY National',
      category: 'mcl',
      imageUrl: '07_MCL_Associate_Member_of_the_Year_Ribbon_-_National.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 8%, #FFD700 8%, #FFD700 92%, #CC0000 92%, #CC0000 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 8, name: 'MCL Marine of the Year Ribbon — Division', shortName: 'MOY Division',
      category: 'mcl',
      imageUrl: '08_MCL_Marine_of_the_Year_Ribbon_-_Division.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 8%, #FFFFFF 8%, #FFFFFF 16%, #CC0000 16%, #CC0000 24%, #FFD700 24%, #FFD700 76%, #CC0000 76%, #CC0000 84%, #FFFFFF 84%, #FFFFFF 92%, #CC0000 92%, #CC0000 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 9, name: 'MCL Associate Member of the Year Ribbon — Division', shortName: 'AMOY Division',
      category: 'mcl',
      imageUrl: '09_MCL_Associate_Member_of_the_Year_Ribbon_-_Division.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 8%, #FFFFFF 8%, #FFFFFF 16%, #CC0000 16%, #CC0000 24%, #FFD700 24%, #FFD700 76%, #CC0000 76%, #CC0000 84%, #FFFFFF 84%, #FFFFFF 92%, #CC0000 92%, #CC0000 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 10, name: 'MCL Marine of the Year Ribbon — Department', shortName: 'MOY Department',
      category: 'mcl',
      imageUrl: '10_MCL_Marine_of_the_Year_Ribbon_-_Department.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 8%, #000080 8%, #000080 16%, #CC0000 16%, #CC0000 24%, #FFD700 24%, #FFD700 76%, #CC0000 76%, #CC0000 84%, #000080 84%, #000080 92%, #CC0000 92%, #CC0000 100%)',
      starType: 'bronze_3_16',
      orientation: 'red_inboard'
    },

    // ── Row 3: More MOY + Recruiters ──
    {
      id: 11, name: 'MCL Associate Member of the Year Ribbon — Department', shortName: 'AMOY Department',
      category: 'mcl',
      imageUrl: '11_MCL_Associate_Member_of_the_Year_Ribbon_-_Department.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 8%, #000080 8%, #000080 16%, #CC0000 16%, #CC0000 24%, #FFD700 24%, #FFD700 76%, #CC0000 76%, #CC0000 84%, #000080 84%, #000080 92%, #CC0000 92%, #CC0000 100%)',
      starType: 'bronze_3_16',
      orientation: 'red_inboard'
    },
    {
      id: 12, name: 'MCL Marine of the Year Ribbon — Detachment', shortName: 'MOY Detachment',
      category: 'mcl',
      imageUrl: '12_MCL_Marine_of_the_Year_Ribbon_-_Detachment.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 8%, #4169E1 8%, #4169E1 16%, #CC0000 16%, #CC0000 24%, #FFD700 24%, #FFD700 76%, #CC0000 76%, #CC0000 84%, #4169E1 84%, #4169E1 92%, #CC0000 92%, #CC0000 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 13, name: 'MCL Associate Member of the Year Ribbon — Detachment', shortName: 'AMOY Detachment',
      category: 'mcl',
      imageUrl: '13_MCL_Associate_Member_of_the_Year_Ribbon_-_Detachment.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 8%, #4169E1 8%, #4169E1 16%, #CC0000 16%, #CC0000 24%, #FFD700 24%, #FFD700 76%, #CC0000 76%, #CC0000 84%, #4169E1 84%, #4169E1 92%, #CC0000 92%, #CC0000 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 14, name: 'MCL National Recruiter — Gold Medal', shortName: 'Nat\'l Recruiter Gold',
      category: 'mcl',
      imageUrl: '14_MCL_National_Recruiter_-_Gold_Medal.png',
      cssGradient: 'linear-gradient(to right, #006B3F 0%, #006B3F 25%, #FFD700 25%, #FFD700 45%, #006B3F 45%, #006B3F 55%, #FFD700 55%, #FFD700 75%, #006B3F 75%, #006B3F 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 15, name: 'MCL National Recruiter — Silver Medal', shortName: 'Nat\'l Recruiter Silver',
      category: 'mcl',
      imageUrl: '15_MCL_National_Recruiter_-_Silver_Medal.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 10%, #006B3F 10%, #006B3F 25%, #FFD700 25%, #FFD700 40%, #006B3F 40%, #006B3F 60%, #FFD700 60%, #FFD700 75%, #006B3F 75%, #006B3F 90%, #CC0000 90%, #CC0000 100%)',
      starType: 'bronze_3_16'
    },

    // ── Row 4: More Recruiters + National Staff ──
    {
      id: 16, name: 'MCL National Recruiter — Bronze Medal', shortName: 'Nat\'l Recruiter Bronze',
      category: 'mcl',
      imageUrl: '16_MCL_National_Recruiter_-_Bronze_Medal.png',
      cssGradient: 'linear-gradient(to right, #006B3F 0%, #006B3F 20%, #FFFFFF 20%, #FFFFFF 30%, #006B3F 30%, #006B3F 70%, #FFFFFF 70%, #FFFFFF 80%, #006B3F 80%, #006B3F 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 17, name: 'MCL Past National Commandant Medal', shortName: 'Past Nat\'l Commandant',
      category: 'mcl',
      imageUrl: '17_MCL_Past_National_Commandant_Medal.png',
      cssGradient: 'linear-gradient(to right, #FFFFFF 0%, #FFFFFF 15%, #FFD700 15%, #FFD700 35%, #FFFFFF 35%, #FFFFFF 65%, #FFD700 65%, #FFD700 85%, #FFFFFF 85%, #FFFFFF 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 18, name: 'MCL National Staff Elected Medal', shortName: 'Nat\'l Staff Elected',
      category: 'mcl',
      imageUrl: '18_MCL_National_Staff_Elected_Medal.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 15%, #FFFFFF 15%, #FFFFFF 25%, #CC0000 25%, #CC0000 40%, #FFFFFF 40%, #FFFFFF 60%, #CC0000 60%, #CC0000 75%, #FFFFFF 75%, #FFFFFF 85%, #CC0000 85%, #CC0000 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 19, name: 'MCL National Staff Appointed Medal', shortName: 'Nat\'l Staff Appointed',
      category: 'mcl',
      imageUrl: '19_MCL_National_Staff_Appointed_Medal.png',
      cssGradient: 'linear-gradient(to right, #006B3F 0%, #006B3F 15%, #FFFFFF 15%, #FFFFFF 25%, #006B3F 25%, #006B3F 40%, #FFFFFF 40%, #FFFFFF 60%, #006B3F 60%, #006B3F 75%, #FFFFFF 75%, #FFFFFF 85%, #006B3F 85%, #006B3F 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 20, name: 'MCL Past Department Commandant Medal', shortName: 'Past Dept Commandant',
      category: 'mcl',
      imageUrl: '20_MCL_Past_Department_Commandant_Medal.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 10%, #FFD700 10%, #FFD700 25%, #CC0000 25%, #CC0000 35%, #FFD700 35%, #FFD700 50%, #FFFFFF 50%, #FFFFFF 65%, #FFD700 65%, #FFD700 75%, #CC0000 75%, #CC0000 90%, #FFD700 90%, #FFD700 100%)',
      starType: 'bronze_3_16'
    },

    // ── Row 5: Department Staff + Detachment ──
    {
      id: 21, name: 'MCL Department Staff Elected Medal', shortName: 'Dept Staff Elected',
      category: 'mcl',
      imageUrl: '21_MCL_Department_Staff_Elected_Medal.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 20%, #FFD700 20%, #FFD700 35%, #CC0000 35%, #CC0000 65%, #FFD700 65%, #FFD700 80%, #CC0000 80%, #CC0000 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 22, name: 'MCL Department Staff Appointed Medal', shortName: 'Dept Staff Appointed',
      category: 'mcl',
      imageUrl: '22_MCL_Department_Staff_Appointed_Medal.png',
      cssGradient: 'linear-gradient(to right, #006B3F 0%, #006B3F 20%, #FFD700 20%, #FFD700 35%, #006B3F 35%, #006B3F 65%, #FFD700 65%, #FFD700 80%, #006B3F 80%, #006B3F 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 23, name: 'MCL Department Recruiter — Silver Medal', shortName: 'Dept Recruiter Silver',
      category: 'mcl',
      imageUrl: '23_MCL_Department_Recruiter_-_Silver_Medal.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 10%, #006B3F 10%, #006B3F 25%, #CC0000 25%, #CC0000 35%, #006B3F 35%, #006B3F 65%, #CC0000 65%, #CC0000 75%, #006B3F 75%, #006B3F 90%, #CC0000 90%, #CC0000 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 24, name: 'MCL Past Detachment Commandant Medal', shortName: 'Past Det Commandant',
      category: 'mcl',
      imageUrl: '24_MCL_Past_Detachment_Commandant_Medal.png',
      cssGradient: 'linear-gradient(to right, #006B3F 0%, #006B3F 15%, #CC0000 15%, #CC0000 30%, #FFD700 30%, #FFD700 45%, #CC0000 45%, #CC0000 55%, #FFD700 55%, #FFD700 70%, #CC0000 70%, #CC0000 85%, #006B3F 85%, #006B3F 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 25, name: 'MCL Detachment Staff Elected Medal', shortName: 'Det Staff Elected',
      category: 'mcl',
      imageUrl: '25_MCL_Detachment_Staff_Elected_Medal.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 15%, #000080 15%, #000080 35%, #CC0000 35%, #CC0000 50%, #FFFFFF 50%, #FFFFFF 65%, #CC0000 65%, #CC0000 85%, #000080 85%, #000080 100%)',
      starType: 'bronze_3_16'
    },

    // ── Row 6: Detachment Staff + Community + Commendation ──
    {
      id: 26, name: 'MCL Detachment Staff Appointed Medal', shortName: 'Det Staff Appointed',
      category: 'mcl',
      imageUrl: '26_MCL_Detachment_Staff_Appointed_Medal.png',
      cssGradient: 'linear-gradient(to right, #FFFFFF 0%, #FFFFFF 15%, #000080 15%, #000080 35%, #FFFFFF 35%, #FFFFFF 50%, #CC0000 50%, #CC0000 65%, #FFFFFF 65%, #FFFFFF 85%, #000080 85%, #000080 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 27, name: 'MCL Detachment Recruiter — Bronze Medal', shortName: 'Det Recruiter Bronze',
      category: 'mcl',
      imageUrl: '27_MCL_Detachment_Recruiter_-_Bronze_Medal.png',
      cssGradient: 'linear-gradient(to right, #006B3F 0%, #006B3F 25%, #FFFFFF 25%, #FFFFFF 35%, #006B3F 35%, #006B3F 65%, #FFFFFF 65%, #FFFFFF 75%, #006B3F 75%, #006B3F 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 28, name: 'MCL Community / VAVS Ribbon', shortName: 'Community/VAVS',
      category: 'mcl',
      imageUrl: '28_MCL_Community_VAVS_Ribbon.png',
      cssGradient: 'linear-gradient(to right, #006B3F 0%, #006B3F 20%, #FFD700 20%, #FFD700 40%, #006B3F 40%, #006B3F 60%, #FFD700 60%, #FFD700 80%, #006B3F 80%, #006B3F 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 29, name: 'MCL Board of Trustees Commendation Ribbon', shortName: 'Board of Trustees',
      category: 'mcl',
      imageUrl: '29_MCL_Board_of_Trustees_Commendation_Ribbon_Victor_T._Fisher_Award.png',
      cssGradient: 'linear-gradient(to right, #000080 0%, #000080 30%, #FFFFFF 30%, #FFFFFF 50%, #CC0000 50%, #CC0000 70%, #FFFFFF 70%, #FFFFFF 100%)',
      starType: 'bronze_3_16',
      orientation: 'blue_inboard'
    },
    {
      id: 30, name: 'MCL National Meritorious Commendation Ribbon', shortName: 'Nat\'l Meritorious Commendation',
      category: 'mcl',
      imageUrl: '30_MCL_National_Meritorious_Commendation_Ribbon.png',
      cssGradient: 'linear-gradient(to right, #FFD700 0%, #FFD700 100%)',
      starType: 'bronze_3_16'
    },

    // ── Row 7: More Commendation + Guard + Marksmanship ──
    {
      id: 31, name: 'MCL Department Meritorious Commendation Ribbon', shortName: 'Dept Meritorious Commendation',
      category: 'mcl',
      imageUrl: '31_MCL_Department_Meritorious_Commendation_Ribbon.png',
      cssGradient: 'linear-gradient(to right, #FFD700 0%, #FFD700 15%, #006B3F 15%, #006B3F 35%, #FFD700 35%, #FFD700 65%, #006B3F 65%, #006B3F 85%, #FFD700 85%, #FFD700 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 32, name: 'MCL Individual Meritorious Commendation Ribbon', shortName: 'Individual Meritorious Commendation',
      category: 'mcl',
      imageUrl: '32_MCL_Individual_Meritorious_Commendation_Ribbon.png',
      cssGradient: 'linear-gradient(to right, #FFFFFF 0%, #FFFFFF 15%, #006B3F 15%, #006B3F 35%, #FFFFFF 35%, #FFFFFF 65%, #006B3F 65%, #006B3F 85%, #FFFFFF 85%, #FFFFFF 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 33, name: 'MCL Ceremonial Guard Ribbon', shortName: 'Ceremonial Guard',
      category: 'mcl',
      imageUrl: '33_MCL_Ceremonial_Guard_Ribbon.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 15%, #4169E1 15%, #4169E1 35%, #FFFFFF 35%, #FFFFFF 50%, #CC0000 50%, #CC0000 65%, #FFFFFF 65%, #FFFFFF 85%, #4169E1 85%, #4169E1 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 34, name: 'MCL Marksmanship Rifle Ribbon', shortName: 'Marksmanship Rifle',
      category: 'mcl',
      imageUrl: '34_MCL_Marksmanship_Rifle_Ribbon.png',
      cssGradient: 'linear-gradient(to right, #000000 0%, #000000 15%, #FFFFFF 15%, #FFFFFF 25%, #000000 25%, #000000 40%, #FFFFFF 40%, #FFFFFF 60%, #000000 60%, #000000 75%, #FFFFFF 75%, #FFFFFF 85%, #000000 85%, #000000 100%)',
      starType: 'bronze_3_16',
      isMarksmanship: true
    },
    {
      id: 35, name: 'MCL Marksmanship Pistol Ribbon', shortName: 'Marksmanship Pistol',
      category: 'mcl',
      imageUrl: '35_MCL_Marksmanship_Pistol_Ribbon.png',
      cssGradient: 'linear-gradient(to right, #000000 0%, #000000 20%, #FFFFFF 20%, #FFFFFF 30%, #000000 30%, #000000 70%, #FFFFFF 70%, #FFFFFF 80%, #000000 80%, #000000 100%)',
      starType: 'bronze_3_16',
      isMarksmanship: true
    },

    // ── Row 8: MODD Awards ──
    {
      id: 36, name: 'MODD Kennel Dog of the Year Medal', shortName: 'Kennel Dog of Year',
      category: 'modd',
      imageUrl: '36_MODD_Kennel_Dog_of_the_Year_Medal.png',
      cssGradient: 'linear-gradient(to right, #8B4513 0%, #8B4513 10%, #FFD700 10%, #FFD700 25%, #8B4513 25%, #8B4513 40%, #CC0000 40%, #CC0000 60%, #8B4513 60%, #8B4513 75%, #FFD700 75%, #FFD700 90%, #8B4513 90%, #8B4513 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 37, name: 'MODD Chief Devil Dog Meritorious Commendation Ribbon', shortName: 'Chief DD Commendation',
      category: 'modd',
      imageUrl: '37_MODD_Chief_Devil_Dog_Meritorious_Commendation_Ribbon.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 15%, #FFD700 15%, #FFD700 30%, #CC0000 30%, #CC0000 45%, #FFFFFF 45%, #FFFFFF 55%, #CC0000 55%, #CC0000 70%, #FFD700 70%, #FFD700 85%, #CC0000 85%, #CC0000 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 38, name: 'MODD Pack Dog of the Year Medal', shortName: 'Pack Dog of Year',
      category: 'modd',
      imageUrl: '38_MODD_Pack_Dog_of_the_Year_Medal.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 15%, #FFD700 15%, #FFD700 35%, #CC0000 35%, #CC0000 50%, #FFD700 50%, #FFD700 65%, #CC0000 65%, #CC0000 85%, #FFD700 85%, #FFD700 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 39, name: 'MODD Pack Leader Meritorious Commendation Ribbon', shortName: 'Pack Leader Commendation',
      category: 'modd',
      imageUrl: '39_MODD_Pack_Leader_Meritorious_Commendation_Ribbon.png',
      cssGradient: 'linear-gradient(to right, #006B3F 0%, #006B3F 15%, #FFD700 15%, #FFD700 30%, #006B3F 30%, #006B3F 45%, #CC0000 45%, #CC0000 55%, #006B3F 55%, #006B3F 70%, #FFD700 70%, #FFD700 85%, #006B3F 85%, #006B3F 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 40, name: 'MODD Pound Dog of the Year Medal', shortName: 'Pound Dog of Year',
      category: 'modd',
      imageUrl: '40_MODD_Pound_Dog_of_the_Year_Medal.png',
      cssGradient: 'linear-gradient(to right, #000000 0%, #000000 10%, #CC0000 10%, #CC0000 20%, #FFD700 20%, #FFD700 35%, #FFFFFF 35%, #FFFFFF 50%, #CC0000 50%, #CC0000 65%, #FFD700 65%, #FFD700 80%, #CC0000 80%, #CC0000 90%, #000000 90%, #000000 100%)',
      starType: 'bronze_3_16'
    },

    // ── Row 9: More MODD + Membership ──
    {
      id: 41, name: 'MODD Pound Keeper Individual Meritorious Achievement Ribbon', shortName: 'Pound Keeper Achievement',
      category: 'modd',
      imageUrl: '41_MODD_Pound_Keeper_Individual_Meritorious_Achievement_Ribbon.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 12%, #FFD700 12%, #FFD700 25%, #006B3F 25%, #006B3F 40%, #FFD700 40%, #FFD700 50%, #CC0000 50%, #CC0000 60%, #FFD700 60%, #FFD700 75%, #006B3F 75%, #006B3F 88%, #FFD700 88%, #FFD700 100%)',
      starType: 'bronze_3_16',
      orientation: 'red_inboard'
    },
    {
      id: 42, name: 'MODD Past Chief Devil Dog Medal', shortName: 'Past Chief DD',
      category: 'modd',
      imageUrl: '42_MODD_Past_Chief_Devil_Dog_Medal.png',
      cssGradient: 'linear-gradient(to right, #8B4513 0%, #8B4513 15%, #FFFFFF 15%, #FFFFFF 25%, #8B4513 25%, #8B4513 40%, #FFD700 40%, #FFD700 60%, #8B4513 60%, #8B4513 75%, #FFFFFF 75%, #FFFFFF 85%, #8B4513 85%, #8B4513 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 43, name: 'MODD Past Pack Leader Medal', shortName: 'Past Pack Leader',
      category: 'modd',
      imageUrl: '43_MODD_Past_Pack_Leader_Medal.png',
      cssGradient: 'linear-gradient(to right, #8B4513 0%, #8B4513 20%, #CC0000 20%, #CC0000 35%, #FFD700 35%, #FFD700 50%, #FFFFFF 50%, #FFFFFF 65%, #CC0000 65%, #CC0000 80%, #8B4513 80%, #8B4513 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 44, name: 'MODD Past Pound Leader Medal', shortName: 'Past Pound Leader',
      category: 'modd',
      imageUrl: '44_MODD_Past_Pound_Leader_Medal.png',
      cssGradient: 'linear-gradient(to right, #8B4513 0%, #8B4513 15%, #CC0000 15%, #CC0000 30%, #8B4513 30%, #8B4513 45%, #FFD700 45%, #FFD700 55%, #8B4513 55%, #8B4513 70%, #CC0000 70%, #CC0000 85%, #8B4513 85%, #8B4513 100%)',
      starType: 'bronze_3_16'
    },
    {
      id: 45, name: 'MCL Membership Medal', shortName: 'Membership Medal',
      category: 'mcl',
      imageUrl: '45_MCL_Membership_Medal.png',
      cssGradient: 'linear-gradient(to right, #006B3F 0%, #006B3F 12%, #CC0000 12%, #CC0000 25%, #FFFFFF 25%, #FFFFFF 37%, #000080 37%, #000080 50%, #CC0000 50%, #CC0000 63%, #FFFFFF 63%, #FFFFFF 75%, #006B3F 75%, #006B3F 88%, #CC0000 88%, #CC0000 100%)',
      starType: 'bronze_3_16'
    },

    // ── Row 10: Anniversary & Convention ──
    {
      id: 46, name: 'MCL 100th Anniversary Ribbon', shortName: '100th Anniversary',
      category: 'convention',
      imageUrl: '46_MCL_100th_Anniversary_Ribbon.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 20%, #FFD700 20%, #FFD700 40%, #CC0000 40%, #CC0000 60%, #FFD700 60%, #FFD700 80%, #CC0000 80%, #CC0000 100%)',
      starType: 'bronze_3_16',
      singleIssue: true,
      hasFrame: true
    },
    {
      id: 47, name: 'MCL 75th National Convention — Silver Medal', shortName: '75th Convention Silver',
      category: 'convention',
      imageUrl: '47_MCL_75th_National_Convention_-_Silver_Medal.png',
      cssGradient: 'linear-gradient(to right, #FFD700 0%, #FFD700 15%, #000080 15%, #000080 35%, #FFD700 35%, #FFD700 50%, #CC0000 50%, #CC0000 65%, #000080 65%, #000080 85%, #FFD700 85%, #FFD700 100%)',
      starType: 'bronze_3_16',
      singleIssue: true
    },
    {
      id: 48, name: 'MCL 75th National Convention — Bronze Medal', shortName: '75th Convention Bronze',
      category: 'convention',
      imageUrl: '48_MCL_75th_National_Convention_-_Bronze_Medal.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 15%, #000080 15%, #000080 30%, #CC0000 30%, #CC0000 45%, #FFD700 45%, #FFD700 55%, #CC0000 55%, #CC0000 70%, #000080 70%, #000080 85%, #CC0000 85%, #CC0000 100%)',
      starType: 'bronze_3_16',
      singleIssue: true
    },
    {
      id: 49, name: 'MCL 50th National Convention — Silver Medal', shortName: '50th Convention Silver',
      category: 'convention',
      imageUrl: '49_MCL_50th_National_Convention_-_Silver_Medal.png',
      cssGradient: 'linear-gradient(to right, #FFD700 0%, #FFD700 20%, #000080 20%, #000080 40%, #FFD700 40%, #FFD700 60%, #000080 60%, #000080 80%, #FFD700 80%, #FFD700 100%)',
      starType: 'bronze_3_16',
      singleIssue: true
    },
    {
      id: 50, name: 'MCL 50th National Convention — Bronze Medal', shortName: '50th Convention Bronze',
      category: 'convention',
      imageUrl: '50_MCL_50th_National_Convention_-_Bronze_Medal.png',
      cssGradient: 'linear-gradient(to right, #CC0000 0%, #CC0000 15%, #FFD700 15%, #FFD700 30%, #000080 30%, #000080 45%, #FFD700 45%, #FFD700 55%, #000080 55%, #000080 70%, #FFD700 70%, #FFD700 85%, #CC0000 85%, #CC0000 100%)',
      starType: 'bronze_3_16',
      singleIssue: true
    },
  ];

  getRibbonsByCategory(category: 'mcl' | 'modd' | 'convention'): Ribbon[] {
    return this.ribbons.filter(r => r.category === category);
  }

  getRibbonById(id: number): Ribbon | undefined {
    return this.ribbons.find(r => r.id === id);
  }
}
